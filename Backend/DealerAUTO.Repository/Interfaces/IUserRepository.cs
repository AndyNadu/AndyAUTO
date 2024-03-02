using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;

namespace DealerAUTO.Repository.Interfaces
{
    public interface IUserRepository
    {
        public User RegisterAccount(User user);
        public User? GetUserByEmail(string email);
        public User? GetUserByCredentials(LoginPostUserDTO user);
    }
}
