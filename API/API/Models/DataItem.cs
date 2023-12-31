using System;
using System.Collections.Generic;

namespace API.Models;

public partial class DataItem
{
    public int Id { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int ContributedBy { get; set; }

    public string ImageLink1 { get; set; } = null!;

    public string? ImageLink2 { get; set; }

    public string? ImageLink3 { get; set; }

    public int Label { get; set; }

    public decimal? Rating { get; set; }

    public decimal? EarningAmount { get; set; }

    public int? AssignedLabel { get; set; }

    public virtual DataLabel? AssignedLabelNavigation { get; set; }

    public virtual PlatformUser ContributedByNavigation { get; set; } = null!;

    public virtual ICollection<DataItemHash> DataItemHashes { get; } = new List<DataItemHash>();

    public virtual ICollection<DataReview> DataReviews { get; } = new List<DataReview>();

    public virtual DataLabel LabelNavigation { get; set; } = null!;

    public virtual ICollection<PlatformShare> PlatformShares { get; } = new List<PlatformShare>();

    public virtual ICollection<Dataset> DataSets { get; } = new List<Dataset>();
}
