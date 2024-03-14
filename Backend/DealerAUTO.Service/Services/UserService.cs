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

        public RegisterResponseUserDTO? RegisterAccount(RegisterPostUserDTO _user)
        {
            User user = new User();
            user.FirstName = _user.FirstName;
            user.LastName = _user.LastName;
            user.Email = _user.Email;
            user.Password = _user.Password;
            user.PhoneNumber = _user.PhoneNumber;

            if (HasEmptyFields(user))
                return null;

            User returnedUser = _userRepository.RegisterAccount(user);

            RegisterResponseUserDTO responseUser = 
                new RegisterResponseUserDTO(
                returnedUser.Id, 
                returnedUser.Email, 
                returnedUser.Password);

            return responseUser;
        }

        public bool HasEmptyFields(User _user)
        {
            if (string.IsNullOrEmpty(_user.FirstName) ||
                string.IsNullOrEmpty(_user.LastName) ||
                string.IsNullOrEmpty(_user.Email) ||
                string.IsNullOrEmpty(_user.Password) ||
                string.IsNullOrEmpty(_user.PhoneNumber))
                return true;

            return false;
        }

        public bool CheckIfEmailUsed(string _email)
        {
            User? user = _userRepository.GetUserByEmail(_email);

            return user != null ? true : false;
        }

        public LoginResponseUserDTO? Login(LoginPostUserDTO _user)
        {
            User? user = _userRepository.GetUserByCredentials(_user);

            return user == null ? null : new LoginResponseUserDTO(
                Id: user.Id,
                FirstName: user.Password
                );
        }
    }
}
