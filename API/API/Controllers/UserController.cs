using System;
using API;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using API.ServiceModels;
using API.ViewModels;
using AutoMapper;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DevContext _context;
        public readonly IMapper _mapper;
        private readonly ILogger<UserController> _logger;
        public UserController(DevContext context, IMapper mapper, ILogger<UserController> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost("api/login")]
        [RequireQueryParameter("login_type")]
        public IActionResult Login(LoginDetails loginDetails)
        {

            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
            _logger.LogInformation($"Request received from IP: {ipAddress}");
            string? paramName = HttpContext.Request.Query["login_type"];
            

            if (ModelState.IsValid)
            {
                if (paramName != null)
                {
                    var reqUser = _context.PlatformUsers.Where(x => x.Username == loginDetails.Username && x.Password == loginDetails.Password && x.UserType == paramName).FirstOrDefault();
                    if (reqUser != null)
                    {
                        return Ok(_mapper.Map<UserViewModel>(reqUser));
                    }
                    return BadRequest("Invalid User Name or Password");
                }

            }
            return BadRequest("Invalid Request");
        }
        [HttpGet("api/user_contributions")]
        [RequireQueryParameter("user_id")]
        public IActionResult GetContributions()
        {
            try {
                string? user_id = HttpContext.Request.Query["user_id"];
                bool isParsable = Int32.TryParse(user_id, out int uId);


                if (isParsable)
                {
                    var contributions = _context.UserContributions.Where(x => x.UserId == uId).ToList();
                    return Ok(contributions);
                }
                return BadRequest("Invalid Request");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching user contributions");
                return StatusCode(500, "Internal server error. Please try again later.");
            }
           
        
        }
    }
}