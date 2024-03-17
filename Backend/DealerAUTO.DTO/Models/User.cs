using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DealerAUTO.DTO.Models;

public class User : IdentityUser<Guid>, IModel<Guid>
{
    [Required]
    public string FirstName { get; set; } = null!;

    [Required]
    public string LastName { get; set; } = null!;

    //email
    //password
    //phonenumber

    public string? Address { get; set; }
    public Guid? EmployeeID { get; set; }
}

