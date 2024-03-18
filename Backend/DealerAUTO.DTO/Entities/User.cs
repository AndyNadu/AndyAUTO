using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DealerAUTO.DTO.Models;

public class User : IdentityUser<Guid>, IEntity<Guid>
{
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    public string Address { get; set; }

    [ForeignKey("Employee")]
    public Guid? EmployeeID { get; set; }
    public virtual Employee? Employee { get; set; }
}

