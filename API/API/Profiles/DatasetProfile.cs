using System;
using API.Models;
using API.ViewModels;
using AutoMapper;
using Newtonsoft.Json;

namespace API.Profiles
{
	public class DatasetProfile:Profile
	{
		public DatasetProfile()
		{
            CreateMap<Dataset, DatasetViewModel>()
                .ForMember(
                    dest => dest.Id,
                    opt => opt.MapFrom(src => src.Id)
                )
                .ForMember(
                    dest => dest.OwnerId,
                    opt => opt.MapFrom(src => src.OwnerId)
                )
                 .ForMember(dest => dest.Labels, opt => opt.MapFrom<JsonToListResolver>())

                 .ForMember(
                    dest => dest.DataItemsCount,
                    opt => opt.MapFrom(src => src.DataItemsCount)
                )
                  .ForMember(
                    dest => dest.SoldDate,
                    opt => opt.MapFrom(src => src.SoldDate)
                )
                   .ForMember(
                    dest => dest.SoldPrice,
                    opt => opt.MapFrom(src => src.SoldPrice)
                )

                .ForMember(
                    dest => dest.DownloadDate,
                    opt => opt.MapFrom(src => src.DownloadDate)
                );

            CreateMap<DatasetViewModel, Dataset>()
               .ForMember(
                   dest => dest.Id,
                   opt => opt.MapFrom(src => src.Id)
               )
               .ForMember(
                   dest => dest.OwnerId,
                   opt => opt.MapFrom(src => src.OwnerId)
               )
                .ForMember(dest => dest.Labels, opt => opt.MapFrom<ListToJsonResolver>())

                .ForMember(
                   dest => dest.DataItemsCount,
                   opt => opt.MapFrom(src => src.DataItemsCount)
               )
                 .ForMember(
                   dest => dest.SoldDate,
                   opt => opt.MapFrom(src => src.SoldDate)
               )
                  .ForMember(
                   dest => dest.SoldPrice,
                   opt => opt.MapFrom(src => src.SoldPrice)
               )

               .ForMember(
                   dest => dest.DownloadDate,
                   opt => opt.MapFrom(src => src.DownloadDate)
               );
        }
	}
}


public class JsonToListResolver : IValueResolver<Dataset, DatasetViewModel, List<string>>
{
    public List<string> Resolve(Dataset source, DatasetViewModel destination, List<string> destMember, ResolutionContext context)
    {
        return JsonConvert.DeserializeObject<List<string>>(source.Labels ?? "[]");
    }
}

public class ListToJsonResolver : IValueResolver<DatasetViewModel, Dataset, string>
{
    public string Resolve(DatasetViewModel source, Dataset destination, string destMember, ResolutionContext context)
    {
        return source.Labels != null ? JsonConvert.SerializeObject(source.Labels) : null;
    }
}