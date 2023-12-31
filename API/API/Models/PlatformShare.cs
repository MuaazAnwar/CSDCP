using System;
using System.Collections.Generic;

namespace API.Models;

public partial class PlatformShare
{
    public int Id { get; set; }

    public int DataItemId { get; set; }

    public int DatasetId { get; set; }

    public decimal EarningAmount { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual DataItem DataItem { get; set; } = null!;

    public virtual Dataset Dataset { get; set; } = null!;
}
