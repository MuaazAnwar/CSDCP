using System;
using System.Collections.Generic;

namespace API.Models;

public partial class UserContribution
{
    public int DataItemId { get; set; }

    public string? AssignedLabel { get; set; }

    public DateTime? UploadedDate { get; set; }

    public string ImageLink1 { get; set; } = null!;

    public string? ImageLink2 { get; set; }

    public string? ImageLink3 { get; set; }

    public string ContributionType { get; set; } = null!;

    public int UserId { get; set; }

    public decimal? Rating { get; set; }

    public decimal? Earning { get; set; }
}
