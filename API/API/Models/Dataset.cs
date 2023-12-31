using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Dataset
{
    public int Id { get; set; }

    public int OwnerId { get; set; }

    public DateTime? DownloadDate { get; set; }

    public int? DataItemsCount { get; set; }

    public string? Labels { get; set; }

    public decimal? SoldPrice { get; set; }

    public DateTime? SoldDate { get; set; }

    public virtual PlatformUser Owner { get; set; } = null!;

    public virtual ICollection<PlatformShare> PlatformShares { get; } = new List<PlatformShare>();

    public virtual ICollection<DataItem> DataItems { get; } = new List<DataItem>();
}
