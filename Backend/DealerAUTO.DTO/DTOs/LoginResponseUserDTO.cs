using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DealerAUTO.DTO.DTOs
{
    public class LoginResponseUserDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }

        public LoginResponseUserDTO(int Id, string FirstName)
        {
            this.Id = Id;
            this.FirstName = FirstName;
        }
    }

}
