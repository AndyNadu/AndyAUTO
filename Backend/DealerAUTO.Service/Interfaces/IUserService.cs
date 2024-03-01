using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DealerAUTO.DTO;
using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;

namespace DealerAUTO.Service.Interfaces
{
    public interface IUserService
    {
        public void RegisterAccount(User user);
        public LoginResponseUserDTO? Login(LoginPostUserDTO user);
        public Boolean CheckCredentials(LoginPostUserDTO user, LoginResponseUserDTO _user);
    }
}
