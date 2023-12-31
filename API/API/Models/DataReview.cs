using System;
using System.Collections.Generic;

namespace API.Models;

public partial class DataReview
{
    public int Id { get; set; }

    public int ReviewedBy { get; set; }

    public int DataItem { get; set; }

    public int? Label { get; set; }

    public string? ReportedIssueType { get; set; }

    public string? IssueDetails { get; set; }

    public decimal? Rating { get; set; }

    public decimal? EarningAmount { get; set; }

    public virtual DataItem DataItemNavigation { get; set; } = null!;

    public virtual DataLabel? LabelNavigation { get; set; }

    public virtual PlatformUser ReviewedByNavigation { get; set; } = null!;
}
