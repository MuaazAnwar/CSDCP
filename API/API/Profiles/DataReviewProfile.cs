using System;
using AutoMapper;
using API.Models;
using API.ViewModels;
namespace API.Profiles
{
	public class DataReviewProfile: Profile
    {
        public DataReviewProfile()
        {

            CreateMap<DataReviewViewModel, DataReview>()
              .ForMember(
                  dest => dest.Label,
                  opt => opt.MapFrom(src => src.Label)
              )
              .ForMember(
                  dest => dest.ReportedIssueType,
                  opt => opt.MapFrom(src => src.ReportedIssueType)
              )
              .ForMember(
                  dest => dest.DataItem,
                  opt => opt.MapFrom(src => src.DataItem)
              )
              .ForMember(
                  dest => dest.IssueDetails,
                  opt => opt.MapFrom(src => src.IssueDetails)
              )
            .ForMember(
                  dest => dest.ReviewedBy,
                  opt => opt.MapFrom(src => src.ReviewedBy)
              );

        }
	}
}

