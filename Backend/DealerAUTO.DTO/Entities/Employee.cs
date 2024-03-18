using System.ComponentModel.DataAnnotations;

#nullable disable

namespace DealerAUTO.DTO.Models;

public class Employee : IEntity<Guid>
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public bool IsManager { get; set; }

    public Guid LocationId { get; set; }
    public virtual Location Location { get; set; }

    //public virtual User User { get; set; }
}
