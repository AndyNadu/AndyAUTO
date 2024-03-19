using Microsoft.AspNetCore.Mvc;

using DealerAUTO.DTO.DTOs;
using DealerAUTO.Service.Interfaces;
using DealerAUTO.DTO.Models;
using Microsoft.AspNetCore.Identity;

namespace DealerAUTO.Controllers
{
    [ApiController]
    [Route("account")]
    public class UserController : ControllerBase
    {
        IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAccountAsync([FromBody] UserDTO user)
        {
            IActionResult result = Ok();

            try
            {
                Result<UserDTO> res = await _userService.CreateUser(user);

                result =  res.IsSuccess ? Ok(res.Value) : BadRequest(res.Error);
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.ToString());
            }

            return result;
        }

        //[HttpPost("login")]
        //public IActionResult Login([FromBody] LoginPostUserDTO user)
        //{
        //    IActionResult result;

        //    try
        //    {
        //        LoginResponseUserDTO? _user = _userService.Login(user);

        //        result = _user == null ? BadRequest("Invalid credentials") : Ok(_user);
        //    }
        //    catch (Exception ex)
        //    {
        //        result = BadRequest(ex.ToString());
        //    }

        //    return result;
        //}
    }
}
