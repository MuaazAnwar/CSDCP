using System;
using API.Models;

namespace API.ViewModels
{
	public class DatasetViewModel
	{
            public int Id { get; set; }

            public int OwnerId { get; set; }

            public DateTime? DownloadDate { get; set; }

            public int? DataItemsCount { get; set; }

            public required List<string> Labels { get; set; }

            public decimal? SoldPrice { get; set; }

            public DateTime? SoldDate { get; set; }
        }
    
}

