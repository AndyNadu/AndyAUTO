using AutoMapper;
using DealerAUTO.DTO.Constants;
using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;
using DealerAUTO.Service.Interfaces;
using Microsoft.AspNetCore.Http;

namespace DealerAUTO.Service.Services;

public class LocationsService : ILocationsService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public LocationsService(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<LocationDTO>> AddLocation(IFormCollection formData)
    {
        LocationDTO locationDTO = _mapper.Map<LocationDTO>(formData);

        if (hasEmptyFields(locationDTO))
            return Result<LocationDTO>.Failure(ErrorConstants.unexpectedError);

        try
        {
            Location location = _mapper.Map<Location>(locationDTO);
            await _unitOfWork.Locations.Add(location);

            LocationDTO _locationDTO = _mapper.Map<LocationDTO>(location);
            return Result<LocationDTO>.Success(locationDTO);
        }
        catch
        {
            return Result<LocationDTO>.Failure(ErrorConstants.unexpectedError);
        }
    }

    public async Task<Result<ICollection<LocationDTO>>> GetLocations()
    {
        try
        {
            IEnumerable<Location> locations = await _unitOfWork.Locations.GetAllAsync();

            LocationDTO[] locationsDTO = _mapper.Map<LocationDTO[]>(locations);

            if (locationsDTO.Length != 0)
            {
                foreach(LocationDTO locationDTO in locationsDTO)
                {
                    //
                }
                return Result<ICollection<LocationDTO>>.Success(locationsDTO);
            }
            else
                return Result<ICollection<LocationDTO>>.Failure(ErrorConstants.noLocationsFound);
        }
        catch (Exception ex)
        {
            //return Result<LocationDTO[]>.Failure(ErrorConstants.unexpectedError);
            return Result<ICollection<LocationDTO>>.Failure(ex.Message);
        }
    }

    public bool hasEmptyFields(LocationDTO locationDTO)
    {
        if (string.IsNullOrEmpty(locationDTO.Address) ||
            string.IsNullOrEmpty(locationDTO.Manager) ||
            string.IsNullOrEmpty(locationDTO.PhoneNumber) ||
            locationDTO.Image == null || locationDTO.Image.Length == 0)
            return true;
        return false;
    }
}
