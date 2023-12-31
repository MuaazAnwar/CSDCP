using System;
using API.Controllers;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
	public class UserService
	{
        private readonly ILogger _logger;
        private readonly DevContext _context;
        private readonly decimal contributionWtg = 0.6m;
        private readonly decimal reviewWtg = 0.4m;
        private readonly decimal platformShare = 0.05m;
        private readonly decimal validatorsShare = 0.45m;
        private readonly decimal contributorShare = 0.5m;




        public UserService(DevContext context, ILogger logger)
        {
            _context = context;
            _logger = logger;
        }


        public void UpdateUserRatingAsync(HashSet<int> userIds, int diId)  //await task
        {
            try
            {
                var contributionDetails = _context.DataItems
                    .Where(x => userIds.Contains(x.ContributedBy))
                    .GroupBy(x => x.ContributedBy)
                    .ToDictionary(
                        x => x.Key,
                        x => x.Count() > 0 ? x.Average(y => y.Rating) : 0
                    );

                var reviewDetails = _context.DataReviews
                    .Where(x => userIds.Contains(x.ReviewedBy))
                    .GroupBy(x => x.ReviewedBy)
                    .ToDictionary(
                        x => x.Key,
                        x => x.Count() > 0 ? x.Average(y => y.Rating) : 0
                    );

                var userRatings = new Dictionary<int, decimal>();
                foreach (var userId in userIds)
                {
                    var contributionRating = contributionDetails.ContainsKey(userId) ? contributionDetails[userId] : 0;
                    var reviewRating = reviewDetails.ContainsKey(userId) ? reviewDetails[userId] : 0;

                    decimal? rating = 0;
                    if (contributionRating > 0 && reviewRating > 0)
                    {
                         rating = (contributionRating * contributionWtg) + (reviewRating * reviewWtg);
                    }
                    else if (contributionRating > 0){
                        rating = contributionRating;

                    }
                    else
                    {
                        rating = reviewRating;

                    }
                    userRatings[userId] = rating.Value;
                }

                foreach (var userRating in userRatings)
                {
                    var userId = userRating.Key;
                    var rating = userRating.Value;
                    var sql = $"UPDATE platform_users SET rating = {rating} WHERE user_id = {userId}";
                    _context.Database.ExecuteSqlRaw(sql);
                }

                _context.SaveChangesAsync();
                _logger.LogInformation($"successfully synced user rating asynchronously, DataItem Id {diId}");
            }
            catch (Exception ex)
            {
                // Log any exceptions that occur
                _logger.LogError(ex, $"An error occurred while updating users rating. User IDs: {string.Join(", ", userIds)}, DataItem Id {diId}");
            }
        }

        public void DistributeShares(int dsId, decimal soldPrice)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var userRating = _context.PlatformUsers.AsNoTracking().ToDictionary(x => x.UserId, x => x.Rating);
                var dataItems = _context.DataItems
                    .Where(x => x.DataSets.Any(ds => ds.Id == dsId)) // item with same data set
                    .Where(x=> !x.PlatformShares.Any(ps => ps.DatasetId == dsId)) //item for which share isn't calculated before with same data set
                    .Include(r=>r.DataReviews)
                    .ToList();

                // calculate share i.e. sold price/ total item
                var sharePerItem = (soldPrice/ dataItems.Count);
                var affectedUser = new HashSet<int>();
                foreach (var item in dataItems)
                {
                    var platformShareAmt = sharePerItem * platformShare;  // 5% platform share
                    var dataItemShare = sharePerItem * contributorShare;   // 50% contrbutor share
                    DeductRatingCharges(ref dataItemShare, ref platformShareAmt, userRating[item.ContributedBy]);
                    item.EarningAmount = dataItemShare;

                    affectedUser.Add(item.ContributedBy);
               
                    var reviews = item.DataReviews.Where(x => x.Label == item.AssignedLabel).ToList();
                    foreach (var review in reviews)
                    {
                        var perValidatorShare = validatorsShare / reviews.Count; // 45% validators share
                        var sharePerReview = sharePerItem * perValidatorShare;  
                        DeductRatingCharges(ref sharePerReview, ref platformShareAmt, userRating[review.ReviewedBy]);
                        review.EarningAmount = sharePerReview;

                        affectedUser.Add(review.ReviewedBy);
                        
                    }
                }
                _context.SaveChanges();
                 UpdateUserWalletAsync(affectedUser,dsId);
                transaction.Commit();

                _logger.LogInformation($"successfully distributed user share shares and wallet updated, DataSet Id: {dsId}");
            }
            catch (Exception ex)
            {
                // Log any exceptions that occur
                _logger.LogError(ex, $"An error occurred while updating shares of data items, DataSet Id: {dsId}");
            }
        }

        private void DeductRatingCharges(ref decimal dataItemShare, ref decimal platformShare, decimal? v)
        {
            var acutalShareAmt = dataItemShare * (v.GetValueOrDefault(5) / 5); // if no rating found, treat as full 
            platformShare += (dataItemShare - acutalShareAmt);
            dataItemShare = acutalShareAmt;
        }

        private void UpdateUserWalletAsync(HashSet<int> userIds,int dsId)
        {
            try
            {
                

                var contributionDetails =  _context.DataItems.AsNoTracking()
        .Where(x => userIds.Contains(x.ContributedBy))
        .GroupBy(x => x.ContributedBy)
        .ToDictionary(
            g => g.Key,
            g => g.Sum(i => i.EarningAmount)
        );

                var reviewDetails =  _context.DataReviews.AsNoTracking()
                    .Where(x => userIds.Contains(x.ReviewedBy))
                    .GroupBy(x => x.ReviewedBy)
                    .ToDictionary(
                        g => g.Key,
                        g => g.Sum(r => r.EarningAmount)
                    );

                foreach (var userId in userIds)
                {
                    var totalEarning = contributionDetails.GetValueOrDefault(userId, 0) + reviewDetails.GetValueOrDefault(userId, 0);
                    var user =  _context.PlatformUsers.Find(userId);
                    if (user != null)
                    {
                        user.WalletAmount = totalEarning; 
                    }
                }


                _context.SaveChanges();
                _logger.LogInformation($"successfully synced user wallet asynchronously, DataSet Id: {dsId}");
            }
            catch (Exception ex)
            {
                // Log any exceptions that occur
                _logger.LogError(ex, $"An error occurred while updating users wallet. User IDs: {string.Join(", ", userIds)},  DataSet Id: {dsId}");
            }
        }
    }
}

