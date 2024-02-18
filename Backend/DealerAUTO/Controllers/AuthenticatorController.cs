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
        public IActionResult RegisterAccount([FromBody] UserDTO user)
        {
            IActionResult result = Ok();

            try
            {
                _userService.RegisterAccount(user);
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.ToString());
            }

            return result;
        }

        [HttpGet("getUserByEmail")]
        public IActionResult GetUserByEmail(string email)
        {
            IActionResult result;

            try
            {
                User user = _userService.GetUserByEmail(email);
                result = Ok(user);
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.ToString());
            }

            return result;
        }
    }
}
