using Microsoft.AspNetCore.Mvc;
using DealerAUTO.Service.Interfaces;

using DealerAUTO.DTO.DTOs;

namespace DealerAUTO.Controllers
{
    //[ApiController]
    //[Route("account")]
    //public class AuthenticatorController : ControllerBase
    //{
    //    IUserService _userService;

    //    public AuthenticatorController(IUserService userService)
    //    {
    //        _userService = userService;
    //    }

    //    [HttpPost("register")]
    //    public IActionResult RegisterAccount([FromBody] RegisterPostUserDTO _user)
    //    {
    //        IActionResult result;

    //        try
    //        {
    //            if (_userService.CheckIfEmailUsed(_user.Email))
    //                result = BadRequest("Email already used");
    //            else
    //            {
    //                RegisterResponseUserDTO? user = _userService.RegisterAccount(_user);
    //                result = user != null ? Ok(user) : BadRequest("Error");
    //            }
    //        }
    //        catch (Exception ex)
    //        {
    //            result = BadRequest(ex.ToString());
    //        }

    //        return result;
    //    }

    //    [HttpPost("login")]
    //    public IActionResult Login([FromBody] LoginPostUserDTO user)
    //    {
    //        IActionResult result;

    //        try
    //        {
    //            LoginResponseUserDTO? _user = _userService.Login(user);

    //            result = _user == null ? BadRequest("Invalid credentials") : Ok(_user);
    //        }
    //        catch (Exception ex)
    //        {
    //            result = BadRequest(ex.ToString());
    //        }

    //        return result;
    //    }
    //}
}
