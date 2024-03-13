using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;

namespace DealerAUTO.Service.Interfaces
{
    public interface IUserService
    {
        public RegisterResponseUserDTO? RegisterAccount(RegisterPostUserDTO user);
        public bool CheckIfEmailUsed(string email);
        public bool HasEmptyFields(User _user);
        public LoginResponseUserDTO? Login(LoginPostUserDTO user);
    }
}
