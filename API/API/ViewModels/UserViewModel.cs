using System;
using API.Models;

namespace API.ViewModels
{
	public class UserViewModel
	{
        public int UserId { get; set; }

        public string Name { get; set; } = null!;

        public string Username { get; set; } = null!;

        public decimal? WalletAmount { get; set; }

        public decimal? Rating { get; set; }
    }
}

