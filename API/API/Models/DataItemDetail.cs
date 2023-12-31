using System;
using System.Collections.Generic;

namespace API.Models;

public partial class DataItemDetail
{
    public int DataItemId { get; set; }

    public string ContributedBy { get; set; } = null!;

    public DateTime? ContributionDate { get; set; }

    public int? UsersReviewedCount { get; set; }

    public int? MatchingLabelReviewsCount { get; set; }

    public string? AssignedLabel { get; set; }

    public string ImageLink1 { get; set; } = null!;

    public string? ImageLink2 { get; set; }

    public string? ImageLink3 { get; set; }
}
