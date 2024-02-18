﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DealerAUTO.DTO;
using DealerAUTO.DTO.DTOs;
using DealerAUTO.DTO.Models;

using DealerAUTO.Repository.Interfaces;

namespace DealerAUTO.Repository.Repositories
{

    public class UserRepository : IUserRepository
    {
        DealerAUTOContext _dbContext = new DealerAUTOContext();

        public void RegisterAccount(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }

        public User GetUserByEmail(string email)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Email == email);
        }
    }
}