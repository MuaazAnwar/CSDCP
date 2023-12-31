using System;
using System.Collections;
using System.Security.Cryptography;
using System.Security.Policy;
using API.Models;
using API.ServiceModels;
using API.Services;
using API.ViewModels;
using AutoMapper;
using CoenM.ImageHash;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Amazon.S3;
using Amazon.S3.Transfer;
using System.Drawing;
using Microsoft.Extensions.Options;

namespace API.Controllers
{

    [ApiController]
    [Route("api/data_item")]
    public class DataItemController : ControllerBase
    {
        private readonly DevContext _context;
        public readonly IMapper _mapper;
        private readonly ILogger<DataItemController> _logger;
        private readonly IAmazonS3 _s3Client;
        private const string BucketName = "csdgp-bucket";
        private readonly AppConfig _appConfig;
        public DataItemController(DevContext context, IMapper mapper, ILogger<DataItemController> logger, IAmazonS3 s3Client, IOptions<AppConfig> appConfig)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
            _s3Client = s3Client;
            _appConfig = appConfig.Value;
        }

        [HttpGet("list")]
        public IActionResult GetAll()
        {
            try
            {
                var dataItemDetails = _context.DataItemDetails.AsNoTracking().ToList();
                return Ok(dataItemDetails);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the data item details.");
                return StatusCode(500, "Internal server error. Please try again later.");

            }
        }
        [HttpPost]
        public IActionResult Create([FromForm] DataItemViewModel dataItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var diService = new DataItemService();
                byte[] imageBytes1 = new byte[dataItem.Image1.Length];
                byte[] imageBytes2 = new byte[dataItem.Image2.Length];
                byte[] imageBytes3 = new byte[dataItem.Image3.Length];

                dataItem.Image1.OpenReadStream().Read(imageBytes1, 0, (int)dataItem.Image1.Length);
                dataItem.Image2.OpenReadStream().Read(imageBytes2, 0, (int)dataItem.Image2.Length);
                dataItem.Image3.OpenReadStream().Read(imageBytes3, 0, (int)dataItem.Image3.Length);

                ulong[] ihashes = new ulong[3];

                ihashes[0] = diService.GetPHash(imageBytes1);
                ihashes[1] = diService.GetPHash(imageBytes2);
                ihashes[2] = diService.GetPHash(imageBytes3);

                for (int i = 0; i < ihashes.Length; i++)
                {
                    for (int j = i + 1; j < ihashes.Length; j++)
                    {
                        var similarity = CompareHash.Similarity(ihashes[i], ihashes[j]);
                        if (similarity > 80)
                        {
                            return BadRequest("Images are not unique");
                        }
                        else if (similarity < 30)
                        {
                            return BadRequest("Images doesn't represent same object");
                        }
                    }
                }

                // check with existing images
                var similarityThreshold = 90;
                int batchSize = 1000;
                int totalCount = _context.DataItemHashes.Count();
                int numBatches = (totalCount + batchSize - 1) / batchSize;

                for (int i = 0; i < numBatches; i++)
                {
                    var hashValues = _context.DataItemHashes.AsNoTracking()
                        .Skip(i * batchSize)
                        .Take(batchSize)
                        .Select(x => x.HashValue)
                        .ToList();

                    bool isSimilarImageExists = hashValues.Any(hash =>
                        CompareHash.Similarity((ulong)hash, ihashes[0]) > similarityThreshold ||
                        CompareHash.Similarity((ulong)hash, ihashes[1]) > similarityThreshold ||
                        CompareHash.Similarity((ulong)hash, ihashes[2]) > similarityThreshold);

                    if (isSimilarImageExists)
                    {
                        return BadRequest("Similar Image exists in Platform");
                    }
                }

               
                string objectKey1 = Guid.NewGuid().ToString() + diService.GetFileExtension(dataItem.Image1.ContentType);
                string objectKey2 = Guid.NewGuid().ToString() + diService.GetFileExtension(dataItem.Image2.ContentType);
                string objectKey3 = Guid.NewGuid().ToString() + diService.GetFileExtension(dataItem.Image3.ContentType);

                var fileTransferUtility = new TransferUtility(_s3Client);
                fileTransferUtility.Upload(dataItem.Image1.OpenReadStream(), BucketName, objectKey1);
                fileTransferUtility.Upload(dataItem.Image2.OpenReadStream(), BucketName, objectKey2);
                fileTransferUtility.Upload(dataItem.Image3.OpenReadStream(), BucketName, objectKey3);

                var newDataItem = new DataItem()
                {
                    CreatedAt = DateTime.Now,
                    ImageLink1 = $"https://{BucketName}.s3.us-west-2.amazonaws.com/{objectKey1}",
                    ImageLink2 = $"https://{BucketName}.s3.us-west-2.amazonaws.com/{objectKey2}",
                    ImageLink3 = $"https://{BucketName}.s3.us-west-2.amazonaws.com/{objectKey3}",
                    ContributedBy = dataItem.ContributedBy,
                    Label = dataItem.Label,
                    Rating = null
                };
                // add hashes in db 
                foreach (var item in ihashes)
                {
                    var itemHash = new DataItemHash() { HashValue = item };
                    newDataItem.DataItemHashes.Add(itemHash);
                }

                _context.DataItems.Add(newDataItem);
                _context.SaveChanges();

                //var locationUri = Url.Action("GetContributions", "User", new { user_id = newDataItem.ContributedBy });
                return Ok(new { message = "Data submitted successfully!" }); // created can be returned


            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing user contribution post request.");
                return StatusCode(500, "Internal server error. Please try again later.");

            }
        }
        [HttpGet]
        public IActionResult GetItem([FromQuery] int currentUserId, [FromQuery] int offset)
        {
            try
            {
                if (offset < 0)
                {
                    return BadRequest("Invalid offset value.");
                }
                if (!_context.PlatformUsers.Any(x => x.UserId == currentUserId))
                {
                    return BadRequest("Invalid user provided");

                }

                var nextItem = _context.DataItems
                    .AsNoTracking()
                    //.Include(x=>x.DataReviews)
                    .Where(item => item.ContributedBy != currentUserId && !item.DataReviews.Any(x=>x.ReviewedBy == currentUserId) && item.Rating == null) // rating null means never reached to consenses
                    .OrderBy(item => item.Id) 
                    .Skip(offset)
                    .Take(1)
                    .FirstOrDefault();

                if (nextItem == null)
                {
                    return NotFound("No more data items to verify!");
                }
                return Ok(nextItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the data item.");
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }
        [HttpPost("review")]
        public IActionResult ItemReview(DataReviewViewModel dataReviewViewItem)
        {
            try
            {
                // validations
                if (string.IsNullOrEmpty(dataReviewViewItem.ReportedIssueType) && !_context.DataLabels.Any(x => x.Id == dataReviewViewItem.Label))
                {
                    return BadRequest("Invalid label provided");
                }
                if (!_context.DataItems.Any(x => x.Id == dataReviewViewItem.DataItem))
                {
                    return BadRequest("Invalid data item provided");

                }
                if (!_context.PlatformUsers.Any(x => x.UserId == dataReviewViewItem.ReviewedBy))
                {
                    return BadRequest("Invalid user provided");

                }

                var dataReview = _mapper.Map<DataReview>(dataReviewViewItem);

                var reviewMap = _context.DataReviews.Where(x => x.DataItem == dataReview.DataItem).GroupBy(x => x.Label.GetValueOrDefault(0)).ToDictionary(x=>x.Key,x=>x.ToList());
                if (reviewMap.ContainsKey(dataReview.Label.GetValueOrDefault(0)) && reviewMap[dataReview.Label.GetValueOrDefault(0)].Count() == (_appConfig.ReviewersCount -1))
                {
                    double contRating =-1;
                    int totalReviews = reviewMap.Sum(group => group.Value.Count) + 1; // +1 current review

                    // we have 2 review and now 3rd is recived, finialize rating
                    if (dataReview.Label == null) // it means picture is reported
                    {
                        // if report type is same for all
                        int reportyTypeCount = 1;
                        var emptyLabelItems = reviewMap[dataReview.Label.GetValueOrDefault(0)];
                        foreach (var item in emptyLabelItems)
                        {
                            if (item.ReportedIssueType == dataReview.ReportedIssueType)
                            {
                                reportyTypeCount++;

                                if (reportyTypeCount == _appConfig.ReviewersCount)
                                {
                                    contRating = 0;
                                    break;
                                }
                            }
                        }
                        // if not reached to consenss i.e. contRating is 0
                        if (contRating == -1) {
                            _context.DataReviews.Add(dataReview);
                            _context.SaveChanges();
                            return Ok(new { message = "Review submitted successfully!" });
                        }

                    }
                    else
                    {
                        // calculate contributor rating
                        contRating = ((double)_appConfig.ReviewersCount / totalReviews) * 5;
                    }
                    
                    double reviewerBaseRating =Math.Log((double)totalReviews / _appConfig.ReviewersCount, 3) * 5;
                    double reviewerRating = Math.Max(0, Math.Min(5, reviewerBaseRating));
                    HashSet<int> affectedUsers = new HashSet<int>();

                    // update contribution
                    //var itemToUpdate = new DataItem { Id = dataReview.DataItem, Rating = (decimal?)contRating };
                    //_context.DataItems.Attach(itemToUpdate);
                    //_context.Entry(itemToUpdate).State = EntityState.Modified;


                    var itemToUpdate = _context.DataItems.Find(dataReview.DataItem);
                    if (itemToUpdate != null)
                    {
                        affectedUsers.Add(itemToUpdate.ContributedBy);
                        itemToUpdate.AssignedLabel = dataReview.Label;
                        if (itemToUpdate.Label == dataReview.Label)
                            itemToUpdate.Rating = (decimal?)contRating;
                        else
                            itemToUpdate.Rating = contRating == 0 ? 0 : 2.5m; //image is reorted =0 or wrong label is given then 2.5


                    }


                    //DataItem itemToupdate = new DataItem { Id = dataReview.DataItem, Rating = (decimal?)contRating };


                    //List<DataReview> dataReviews = new List<DataReview>();
                    // update reviews rating having different label

                    var reviewsWithDiffLabel = reviewMap.Where(x => x.Key != dataReview.Label.GetValueOrDefault(0)).SelectMany(x => x.Value).ToList();
                    foreach (var item in reviewsWithDiffLabel)
                    {
                        affectedUsers.Add(item.ReviewedBy);
                        item.Rating = (decimal?)reviewerRating; 
                        //dataReviews.Append(new DataReview { Id = item.Id, Rating = (decimal?)reviewerRating });

                    }

                    // update reviews rating having same label
                    var reviewsWithSameLabel = reviewMap[dataReview.Label.GetValueOrDefault(0)];
                    foreach (var item in reviewsWithSameLabel)
                    {
                        if (item.Label == null && item.ReportedIssueType == dataReview.ReportedIssueType)
                        {
                            affectedUsers.Add(item.ReviewedBy);
                            item.Rating = 5;
                            //dataReviews.Append(new DataReview { Id = item.Id, Rating = 5 });

                        }
                        else if (item.Label == null && item.ReportedIssueType != dataReview.ReportedIssueType)
                        {
                            affectedUsers.Add(item.ReviewedBy);
                            item.Rating = (decimal?)reviewerRating;
                            //dataReviews.Append(new DataReview { Id = item.Id, Rating = (decimal?)reviewerRating });
                        }
                        else if (item.Label != null)
                        {
                            affectedUsers.Add(item.ReviewedBy);
                            item.Rating = 5;
                            //dataReviews.Append(new DataReview { Id = item.Id, Rating = 5 });
                        }
                    }

                    // update itemToupdate, reviewsWithDiffLabel,reviewsWithSameLabel in db


                    dataReview.Rating = 5;
                    _context.DataReviews.Add(dataReview);
                    _context.SaveChanges();

                    // update user rating based on rating assigned to contribution and reviews
                    UserService _userService = new UserService(_context, _logger);
                    //Task.Run(() => _userService.UpdateUserRatingAsync(affectedUsers, dataReview.DataItem));
                    _userService.UpdateUserRatingAsync(affectedUsers, dataReview.DataItem);


                }
                else
                {
                    _context.DataReviews.Add(dataReview);
                    _context.SaveChanges();
                }

                return Ok(new { message = "Review submitted successfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while saving data item review.");
                return StatusCode(500, "Internal server error. Please try again later.");

            }
        }
    }

}

