using AutoMapper;
using DealerAUTO.DTO.Constants;
using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;
using DealerAUTO.Service.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DealerAUTO.Service.Services;

public class UsersService : IUsersService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IMapper _mapper;

    public UsersService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _mapper = mapper;
    }

    public async Task<Result<UserDTO>> CreateUser(UserDTO userDTO)
    {
        if (hasEmptyFieldsRegister(userDTO))
            return Result<UserDTO>.Failure(ErrorConstants.unexpectedError);

        User user = _mapper.Map<User>(userDTO);

        if (isEmailAlreadyRegistered(user.Email!))
            return Result<UserDTO>.Failure(ErrorConstants.emailUsed);

        if (isPhoneAlreadyRegistered(user.PhoneNumber!))
            return Result<UserDTO>.Failure(ErrorConstants.phoneUsed);

        PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
        user.PasswordHash = passwordHasher.HashPassword(user, userDTO.Password!);
        user.UserName = user.Email + "makeItUnique";

        try
        {
            IdentityResult result = await _userManager.CreateAsync(user);
            UserDTO _userDTO = _mapper.Map<UserDTO>(user);
            return Result<UserDTO>.Success(_userDTO);
        }
        catch (Exception ex)
        {
            return Result<UserDTO>.Failure(ex.Message);
        }
    }
    public bool hasEmptyFieldsRegister(UserDTO userDTO)
    {
        if (string.IsNullOrEmpty(userDTO.Password) ||
            string.IsNullOrEmpty(userDTO.FirstName) ||
            string.IsNullOrEmpty(userDTO.LastName) ||
            string.IsNullOrEmpty(userDTO.Email) ||
            string.IsNullOrEmpty(userDTO.PhoneNumber))
            return true;
        return false;
    }
    public bool hasEmptyFieldsLogin(UserDTO userDTO)
    {
        if (string.IsNullOrEmpty(userDTO.Email) ||
            string.IsNullOrEmpty(userDTO.Password))
            return true;
        return false;
    }
    public bool isPhoneAlreadyRegistered(string phoneNumber)
    {
        return _userManager.Users.Any(user =>
            user.PhoneNumber == phoneNumber
        );
    }
    public bool isEmailAlreadyRegistered(string email)
    {
        return _userManager.Users.Any(user =>
            user.Email == email
        );
    }
    public async Task<Result<UserDTO>> LoginUser(UserDTO userDTO)
    {
        if (hasEmptyFieldsLogin(userDTO))
            return Result<UserDTO>.Failure(ErrorConstants.unexpectedError);

        try
        {
            User? user = await _userManager.FindByEmailAsync(userDTO.Email!);

            if (user == null)
                return Result<UserDTO>.Failure(ErrorConstants.invalidCredentials);

            SignInResult result = await _signInManager.PasswordSignInAsync(user, userDTO.Password!, false, false);

            if (result.Succeeded)
            {
                UserDTO _userDTO = new UserDTO
                {
                    Id = user.Id,
                    Role = user.EmployeeID != null ? "user" : "employee"
                };

                return Result<UserDTO>.Success(_userDTO);
            }
            else 
                return Result<UserDTO>.Failure(ErrorConstants.invalidCredentials);
        }
        catch
        {
            return Result<UserDTO>.Failure(ErrorConstants.unexpectedError);
        }
    }
    public async Task<Result<ICollection<UserDTO>>> GetUsers()
    {
        try
        {
            IEnumerable<User> users = await _userManager.Users.ToListAsync();

            ICollection<UserDTO> usersDTO = _mapper.Map<UserDTO[]>(users);

            if (usersDTO.Count != 0)
                return Result<ICollection<UserDTO>>.Success(usersDTO);
            else
                return Result<ICollection<UserDTO>>.Failure(ErrorConstants.noUsersFound);
        }
        catch
        {
            return Result<ICollection<UserDTO>>.Failure(ErrorConstants.unexpectedError);
        }
    }
    public async Task<Result<UserDTO>> ChangeRole(UserDTO userDTO)
    {
        //if (userDTO.Role === 'User')
        //    ChangeRoleToAdmin(userDTO);
        //else
        //    ChangeRoleTouser(userDTO);

        return null;
    }
    //public async Task<Result<UserDTO>> ChangeRoleToAdmin(UserDTO)
    //{
    //    Employee employee = new Employee {
    //        IsManager = false,

    //    };
    //}
}
