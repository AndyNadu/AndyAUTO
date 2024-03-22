using DealerAUTO.DTO.Constants;
using DealerAUTO.DTO.DTOs;
using DealerAUTO.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace DealerAUTO.Controllers;

[ApiController]
[Route("account")]
public class UsersController : ControllerBase
{
    IUsersService _userService;

    public UsersController(IUsersService userService)
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
        catch
        {
            result = BadRequest(ErrorConstants.unexpectedError);
        }

        return result;
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginUserAsync([FromBody] UserDTO user)
    {
        IActionResult result = Ok();

        try
        {
            Result<UserDTO> res = await _userService.LoginUser(user);

            result = res.IsSuccess ? Ok(res.Value) : BadRequest(res.Error);
        }
        catch 
        {
            result = BadRequest(ErrorConstants.unexpectedError);
        }

        return result;
    }

    [HttpGet("manage/get-users")]
    public async Task<IActionResult> GetUsers()
    {
        IActionResult result = Ok();

        try
        {
            Result<ICollection<UserDTO>> res = await _userService.GetUsers();

            result = res.IsSuccess ? Ok(res.Value) : BadRequest(res.Error);
        }
        catch
        {
            result = BadRequest(ErrorConstants.unexpectedError);
        }

        return result;
    }

    [HttpPut("manage/user-change-role")]
    public async Task<IActionResult> ChangeRole(UserDTO user)
    {
        IActionResult result = Ok();

        try
        {
            Result<UserDTO> res = await _userService.ChangeRole(user);

            result = res.IsSuccess ? Ok(res.Value) : BadRequest(res.Error);
        }
        catch
        {
            result = BadRequest(ErrorConstants.unexpectedError);
        }

        return result;
    }
} 
