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

        public RegisterResponseUserDTO? RegisterAccount(RegisterPostUserDTO user)
        {
            if (checkIfEmailUsed(user.Email))
                return null;

            User _user = new User();
            _user.FirstName = user.FirstName;
            _user.LastName = user.LastName;
            _user.Email = user.Email;
            _user.Password = user.Password;
            _user.PhoneNumber = user.PhoneNumber;

            User returnedUser = _userRepository.RegisterAccount(_user);

            RegisterResponseUserDTO responseUser = 
                new RegisterResponseUserDTO(
                returnedUser.Id, 
                returnedUser.Email, 
                returnedUser.Password);

            return responseUser;
        }

        public bool checkIfEmailUsed(string email)
        {
            User? user = _userRepository.GetUserByEmail(email);

            return user != null ? true : false;
        }

        public LoginResponseUserDTO? Login(LoginPostUserDTO user)
        {
            User? _user = _userRepository.GetUserByCredentials(user);

            return _user == null ? null : new LoginResponseUserDTO(
                Id: _user.Id,
                Email: _user.Email,
                Password: _user.Password
                );
        }
    }
}
