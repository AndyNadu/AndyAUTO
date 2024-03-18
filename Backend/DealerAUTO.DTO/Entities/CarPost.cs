using System.ComponentModel.DataAnnotations;

#nullable disable

namespace DealerAUTO.DTO.Models;

public class CarPost : IEntity<Guid>
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public DateTime PostTime { get; set; }
    [Required]
    public bool Verified { get; set; } = false;

    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid CarId { get; set; }
    public Car Car { get; set; }

    public Guid LocationId { get; set; }
    public Location Location { get; set; }
}
