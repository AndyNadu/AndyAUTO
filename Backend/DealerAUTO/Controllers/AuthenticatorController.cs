using Microsoft.AspNetCore.Mvc;
using DealerAUTO.Service.Interfaces;

using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;

namespace DealerAUTO.Controllers
{
    [ApiController]
    [Route("account")]
    public class AuthenticatorController : ControllerBase
    {
        IUserService _userService;

        public AuthenticatorController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult RegisterAccount([FromBody] User user)
        {
            IActionResult result = Ok();

            try
            {
                //_userService.RegisterAccount(user);
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.ToString());
            }

            return result;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginPostUserDTO user)
        {
            IActionResult result;

            try
            {
                LoginResponseUserDTO? _user = _userService.Login(user);

                result = _user == null ? BadRequest("Invalid credentials") : Ok(_user);
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.ToString());
            }

            return result;
        }
    }
}
