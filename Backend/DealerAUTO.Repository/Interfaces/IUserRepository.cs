using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DealerAUTO.DTO;
using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;

namespace DealerAUTO.Repository.Interfaces
{
    public interface IUserRepository
    {
        public void RegisterAccount(User user);
        public User? GetUserByEmail(string email);
    }
}
