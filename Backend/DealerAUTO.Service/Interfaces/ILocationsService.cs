using DealerAUTO.DTO.DTOs;
using Microsoft.AspNetCore.Http;

namespace DealerAUTO.Service.Interfaces;

public interface ILocationsService
{
    Task<Result<LocationDTO>> AddLocation(IFormCollection formData);
    bool hasEmptyFields(LocationDTO locationDTO);
    Task<Result<ICollection<LocationDTO>>> GetLocations();

}
