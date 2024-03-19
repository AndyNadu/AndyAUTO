using AutoMapper;
using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;

namespace DealerAUTO.Service.AutoMapper;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<UserDTO, User>().ReverseMap();
    }
}
