using DealerAUTO.DTO.DTOs;

namespace DealerAUTO.Service.Interfaces
{
    public interface IUserService
    {
        public RegisterResponseUserDTO? RegisterAccount(RegisterPostUserDTO user);
        public bool checkIfEmailUsed(string email);
        public LoginResponseUserDTO? Login(LoginPostUserDTO user);
    }
}
