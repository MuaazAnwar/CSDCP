using System;
using System.Collections.Generic;

namespace API.Models;

public partial class DataItemHash
{
    public int DataItemId { get; set; }

    public decimal HashValue { get; set; }

    public virtual DataItem DataItem { get; set; } = null!;
}
