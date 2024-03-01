using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DealerAUTO.DTO;
using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;

using DealerAUTO.Repository.Interfaces;
using DealerAUTO.Service.Interfaces;

namespace DealerAUTO.Service.Services
{
    public class UserService : IUserService
    {
        IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        } 

        public void RegisterAccount(User user)
        {
            var newUser = new User
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = user.Password,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
            };

            _userRepository.RegisterAccount(newUser);
        }

        public LoginResponseUserDTO? Login(LoginPostUserDTO user)
        {
            LoginResponseUserDTO? _user = _userRepository.GetUserByEmail(user.Email);

            if (_user != null && CheckCredentials(user, _user))
                return _user;

            return null;
        }

        public Boolean CheckCredentials(LoginPostUserDTO user, LoginResponseUserDTO _user)
        {
            if (user.Email == _user.Email &&
                user.Password == _user.Password)
                return true;
            return false;
        }
    }
}
