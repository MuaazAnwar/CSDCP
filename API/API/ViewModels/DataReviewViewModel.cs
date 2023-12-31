using System;
using API.Models;

namespace API.ViewModels
{
	public class DataReviewViewModel
	{
		
        public int ReviewedBy { get; set; }

        public int DataItem { get; set; }

        public int? Label { get; set; }

        public string? ReportedIssueType { get; set; }

        public string? IssueDetails { get; set; }

        public decimal? Rating { get; set; }

        public decimal? EarningAmount { get; set; }

    
    
	}
}

