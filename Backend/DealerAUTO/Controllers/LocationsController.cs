using DealerAUTO.DTO.Constants;
using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;
using DealerAUTO.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DealerAUTO.Controllers;

[ApiController]
[Route("account/manage")]
public class LocationsController : ControllerBase
{
    ILocationsService _locationService;

    public LocationsController(ILocationsService locationService)
    {
        _locationService = locationService;
    }

    [HttpPost("add-location")]
    public async Task<IActionResult> AddLocation([FromForm] IFormCollection formData)
    {
        IActionResult result = Ok();

        try
        {
            Result<LocationDTO> res = await _locationService.AddLocation(formData);

            result = res.IsSuccess ? Ok(res.Value) : BadRequest(res.Error);
        }
        catch 
        {
            result = BadRequest(ErrorConstants.unexpectedError);
        }

        return result;
    }

    [HttpGet("get-locations")]
    public async Task<IActionResult> GetLocations()
    {
        IActionResult result = Ok();

        try
        {
            Result<ICollection<LocationDTO>> res = await _locationService.GetLocations();

            result = res.IsSuccess ? Ok(res.Value) : BadRequest(res.Error);
        }
        catch
        {
            result = BadRequest(ErrorConstants.unexpectedError);
        }

        return result;
    }


}
