using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;

using DealerAUTO.Repository.Interfaces;

namespace DealerAUTO.Repository.Repositories
{

    public class UserRepository : IUserRepository
    {
        readonly DealerAUTOContext _dbContext = new DealerAUTOContext();

        public User RegisterAccount(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            return user;
        }

        public User? GetUserByEmail(string email)
        {
            User? user = _dbContext.Users.FirstOrDefault(u => u.Email == email);

            return user == null ? null : user;
        }

        public User? GetUserByCredentials(LoginPostUserDTO user)
        {
            User? _user = _dbContext.Users.FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password);

            return _user == null ? null : _user;
        }
    }
}
