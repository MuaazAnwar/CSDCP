using System;
using API.Models;
using API.Services;
using API.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/dataset")]
    public class DatasetController: ControllerBase
    {
        private readonly DevContext _context;
        public readonly IMapper _mapper;
        private readonly ILogger<DataLabelController> _logger;

        public DatasetController(DevContext context, IMapper mapper, ILogger<DataLabelController> logger)
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
                var datasets = _context.Datasets.AsNoTracking().ToList();
                var datasetsViewModels = datasets.Select(x => _mapper.Map<DatasetViewModel>(x)).ToList();
                return Ok(datasetsViewModels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the data set.");
                return StatusCode(500, "Internal server error. Please try again later.");
            }

        }
        [HttpPost]
        public IActionResult Create(DatasetViewModel datasetViewModel)
        {
            try
            {
                if (datasetViewModel == null)
                {
                    return BadRequest("Invalid payload provided");
                }
                if (!_context.PlatformUsers.Any(x => x.UserId == datasetViewModel.OwnerId))
                {
                    return BadRequest("Invalid user provided");

                }
                var datasetLabels = datasetViewModel.Labels;
                if (datasetLabels.Count == 0)
                {
                    return BadRequest("No labels provided");
                }
                var labelIds = _context.DataLabels.AsNoTracking().Where(x => datasetLabels.Contains(x.LabelName)).Select(x => x.Id).ToList();
                if (labelIds.Count != datasetLabels.Count)
                    return BadRequest("One or more labels not found");

                // validations end
                var dataItems = _context.DataItems.Where(x => labelIds.Contains(x.AssignedLabel.GetValueOrDefault(-1))).ToList();
                

                var newDataset = _mapper.Map<Dataset>(datasetViewModel);
                newDataset.DataItemsCount = dataItems.Count;
                newDataset.DownloadDate = DateTime.Now;
                newDataset.DataItems.AddRange(dataItems);

                _context.Datasets.Add(newDataset);
                _context.SaveChanges();
                return Ok(new { message = "dataset created successfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the data set");
                return StatusCode(500, "Internal server error. Please try again later.");
            }

        }


        [HttpPut]
        public IActionResult SoldDataset(DatasetViewModel datasetViewModel)
        {
            try
            {
                if (datasetViewModel.SoldPrice.HasValue && datasetViewModel.SoldPrice < 1)
                {
                    return BadRequest("Invalid sold price, price should be greater than 0");
                }

                var dataset = _context.Datasets.Where(x => x.Id == datasetViewModel.Id).FirstOrDefault();
                if (dataset == null)
                {
                    return BadRequest("Invalid dataset id provided");
                }
                if (dataset.SoldPrice.HasValue)
                {
                    return BadRequest("Dataset already sold");
                }
                dataset.SoldPrice = datasetViewModel.SoldPrice;
                dataset.SoldDate = DateTime.Now;
                //_context.SaveChanges();

                // update data item shares and user wallet amount
                UserService _userService = new UserService(_context, _logger);
                //Task.Run(() => _userService.DistributeShares(dataset.Id, dataset.SoldPrice.Value));
                _userService.DistributeShares(dataset.Id, dataset.SoldPrice.Value);
                return Ok(new { message = "data mark as sold successfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the data set.");
                return StatusCode(500, "Internal server error. Please try again later.");
            }

        }

    }
}