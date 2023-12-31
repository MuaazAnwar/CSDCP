using System;
using AutoMapper;
using API.Models;
using API.ViewModels;

namespace API.Profiles
{

    public class DataLabelProfile : Profile
    {
        public DataLabelProfile()
        {
            CreateMap<DataLabel, DataLabelViewModel>()
                .ForMember(
                    dest => dest.Id,
                    opt => opt.MapFrom(src => src.Id)
                )
                .ForMember(
                    dest => dest.LabelName,
                    opt => opt.MapFrom(src => src.LabelName)
                )
                .ForMember(
                    dest => dest.CreatedAt,
                    opt => opt.MapFrom(src => src.CreatedAt)
                )
                .ForMember(
                    dest => dest.ParentId,
                    opt => opt.MapFrom(src => src.ParentId)
                );
        }
    }
}
