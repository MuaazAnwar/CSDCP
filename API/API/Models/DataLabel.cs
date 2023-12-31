using System;
using System.Collections.Generic;

namespace API.Models;

public partial class DataLabel
{
    public int Id { get; set; }

    public string LabelName { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public int? ParentId { get; set; }

    public virtual ICollection<DataItem> DataItemAssignedLabelNavigations { get; } = new List<DataItem>();

    public virtual ICollection<DataItem> DataItemLabelNavigations { get; } = new List<DataItem>();

    public virtual ICollection<DataReview> DataReviews { get; } = new List<DataReview>();

    public virtual ICollection<DataLabel> InverseParent { get; } = new List<DataLabel>();

    public virtual DataLabel? Parent { get; set; }
}
