using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;

namespace DealerAUTO.DTO.Models;

public class User : IdentityUser<Guid>, IEntity<Guid, bool>
{
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }

    public string? Address { get; set; }

    [ForeignKey("Employee")]
    public Guid? EmployeeID { get; set; }
    public virtual Employee? Employee { get; set; }

    public virtual ICollection<CarPost>? CarPost { get; set; }
    public virtual ICollection<FavouriteCarPost>? FavouriteCarPostsList { get; set; }

    [Required]
    public bool isDeleted { get; set; }
}

