using System;
using API.Models;
using API.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using AutoMapper;

namespace API.Controllers
{
    [ApiController]
    [Route("api/data_label")]
    public class DataLabelController : ControllerBase
	{
        private readonly DevContext _context;
        public readonly IMapper _mapper;
        private readonly ILogger<DataLabelController> _logger;

        public DataLabelController(DevContext context, IMapper mapper, ILogger<DataLabelController> logger)
		{
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("list")]
        public IActionResult GetAll()
        {
            try
            {
                var dataLabels = _context.DataLabels.AsNoTracking().ToList();
                var dataLabelViewModels = dataLabels.Select(x => _mapper.Map<DataLabelViewModel>(x)).ToList();
                return Ok(dataLabelViewModels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the data label.");
                return StatusCode(500, "Internal server error. Please try again later.");
            }

        }

    }
}
