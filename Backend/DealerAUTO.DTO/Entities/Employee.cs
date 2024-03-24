using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DealerAUTO.DTO.Models;

public class Employee : IEntity<Guid, bool>
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public bool IsManager { get; set; }

    public Guid? LocationId { get; set; }
    public virtual Location Location { get; set; }

    public virtual User User { get; set; }

    [Required]
    public bool isDeleted { get; set; }
}
