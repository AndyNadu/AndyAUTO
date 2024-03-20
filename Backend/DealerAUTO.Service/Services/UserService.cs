using AutoMapper;
using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;
using DealerAUTO.Service.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace DealerAUTO.Service.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IMapper _mapper;

    public UserService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _mapper = mapper;
    }

    public async Task<Result<UserDTO>> CreateUser(UserDTO userDTO)
    {
        if (hasEmptyFieldsRegister(userDTO))
            return Result<UserDTO>.Failure("An unexpected error has occured!");

        User user = _mapper.Map<User>(userDTO);

        if (isEmailAlreadyRegistered(user.Email!))
            return Result<UserDTO>.Failure("Email is already registered!");

        if (isPhoneAlreadyRegistered(user.PhoneNumber!))
            return Result<UserDTO>.Failure("Phone number is already registered!");

        PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
        user.PasswordHash = passwordHasher.HashPassword(user, userDTO.Password!);
        user.UserName = user.Email + "makeItUnique";

        try
        {
            IdentityResult result = await _userManager.CreateAsync(user);

            if (result.Succeeded)
            {
                UserDTO _userDTO = _mapper.Map<UserDTO>(user);
                return Result<UserDTO>.Success(_userDTO);
            }
            else
                return Result<UserDTO>.Failure(result.Errors.FirstOrDefault()?.Description ?? "Unknown error");
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
            return Result<UserDTO>.Failure("An unexpected error has occured!");

        try
        {
            User? user = await _userManager.FindByEmailAsync(userDTO.Email);

            if (user == null)
                return Result<UserDTO>.Failure("Wrong credentials!");

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
                return result.IsNotAllowed ? Result<UserDTO>.Failure("An unexpected error has occured!") : Result<UserDTO>.Failure("Wrong credentials!");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return Result<UserDTO>.Failure("An unexpected error has occured!");
        }
    }
}
