using System;
using API.Models;

namespace API.ViewModels
{
	public class DataItemViewModel
	{

        public int ContributedBy { get; set; }

        public IFormFile Image1 { get; set; } = null!;

        public IFormFile Image2 { get; set; } = null!;

        public IFormFile Image3 { get; set; } = null!;

        public int Label { get; set; }
    }
	
}

