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

        public void RegisterAccount(UserDTO user)
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

        public User GetUserByEmail(string email)
        {
            return _userRepository.GetUserByEmail(email);
        }
    }
}
