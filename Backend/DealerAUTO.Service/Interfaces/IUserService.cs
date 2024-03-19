using DealerAUTO.DTO.DTOs;

namespace DealerAUTO.Service.Interfaces;

public interface IUserService
{
    public Task<Result<UserDTO>> CreateUser(UserDTO userDTO);
    public bool hasEmptyFields(UserDTO userDTO);
    public bool isPhoneAlreadyRegistered(string phoneNumber);
    public bool isEmailAlreadyRegistered(string email);
}
