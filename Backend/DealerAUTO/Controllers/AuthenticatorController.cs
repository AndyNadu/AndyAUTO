using Microsoft.AspNetCore.Mvc;
using DealerAUTO.Service.Interfaces;

using DealerAUTO.DTO.DTOs;

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
        public IActionResult RegisterAccount([FromBody] RegisterPostUserDTO user)
        {
            IActionResult result;

            try
            {
                RegisterResponseUserDTO? _user = _userService.RegisterAccount(user);

                if (_user == null)
                    result = BadRequest("Email already used");
                else 
                    result = Ok(_user);
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.ToString());
            }

            return result;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginPostUserDTO user)
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
