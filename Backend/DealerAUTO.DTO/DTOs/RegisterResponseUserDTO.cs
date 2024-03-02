using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealerAUTO.DTO.DTOs
{
    public class RegisterResponseUserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public RegisterResponseUserDTO(int Id, string Email, string Password)
        {
            this.Id = Id;
            this.Email = Email;
            this.Password = Password;
        }
    }

}
