using System;
namespace API.ServiceModels
{
	public class LoginDetails
	{
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}

