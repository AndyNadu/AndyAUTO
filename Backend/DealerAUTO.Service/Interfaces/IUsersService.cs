using DealerAUTO.DTO.DTOs;

namespace DealerAUTO.Service.Interfaces;

public interface IUsersService
{
    Task<Result<UserDTO>> CreateUser(UserDTO userDTO);
    bool hasEmptyFieldsRegister(UserDTO userDTO);
    bool hasEmptyFieldsLogin(UserDTO userDTO);
    bool isPhoneAlreadyRegistered(string phoneNumber);
    bool isEmailAlreadyRegistered(string email);
    Task<Result<UserDTO>> LoginUser(UserDTO userDTO);
    Task<Result<ICollection<UserDTO>>> GetUsers();
    Task<Result<UserDTO>> ChangeRole(UserDTO userDTO);
}
