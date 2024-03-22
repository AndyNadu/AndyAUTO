using AutoMapper;
using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;
using Microsoft.AspNetCore.Http;

namespace DealerAUTO.Service.AutoMapper;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<UserDTO, User>().ReverseMap();
        CreateMap<LocationDTO, Location>().ReverseMap();
        CreateMap<IFormCollection, LocationDTO>()
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src["address"]))
            .ForMember(dest => dest.Manager, opt => opt.MapFrom(src => src["manager"]))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src["phoneNumber"]))
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => ConvertIFormFileToByteArray(src.Files)));
        CreateMap<User, UserDTO>()
            .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.EmployeeID == null ? "User" : "Admin"));
    }

    private byte[] ConvertIFormFileToByteArray(IFormFileCollection files)
    {
        IFormFile formFile = files[0];

        using (var memoryStream = new MemoryStream())
        {
            formFile.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }   
    }
}
