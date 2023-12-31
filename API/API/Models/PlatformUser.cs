using System;
using System.Collections.Generic;

namespace API.Models;

public partial class PlatformUser
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string UserType { get; set; } = null!;

    public decimal? WalletAmount { get; set; }

    public decimal? Rating { get; set; }

    public virtual ICollection<DataItem> DataItems { get; } = new List<DataItem>();

    public virtual ICollection<DataReview> DataReviews { get; } = new List<DataReview>();

    public virtual ICollection<Dataset> Datasets { get; } = new List<Dataset>();
}
