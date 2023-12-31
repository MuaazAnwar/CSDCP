using System;
using AutoMapper;
using API.Models;
using API.ViewModels;


namespace API.Profiles
{
	public class UserProfile:Profile
	{
        public UserProfile() {
            CreateMap<PlatformUser, UserViewModel>()
                    .ForMember(
                        dest => dest.UserId,
                        opt => opt.MapFrom(src => src.UserId)
                    )
                    .ForMember(
                        dest => dest.Name,
                        opt => opt.MapFrom(src => src.Name)
                    )
                    .ForMember(
                        dest => dest.Username,
                        opt => opt.MapFrom(src => src.Username)
                    )
                    .ForMember(
                        dest => dest.WalletAmount,
                        opt => opt.MapFrom(src => src.WalletAmount)
                    )
             .ForMember(
                        dest => dest.Rating,
                        opt => opt.MapFrom(src => src.Rating)
                    );
        }
	}

    

}

