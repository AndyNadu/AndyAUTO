using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DealerAUTO.DTO.Models;

public class CarPost : IEntity<Guid, bool>
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public DateTime PostTime { get; set; }
    [Required]
    public bool Verified { get; set; }

    [ForeignKey("User")]
    public Guid UserId { get; set; }
    public User User { get; set; }

    [ForeignKey("Car")]
    public Guid CarId { get; set; }
    public Car Car { get; set; }

    [ForeignKey("Location")]
    public Guid LocationId { get; set; }
    public Location Location { get; set; }

    [Required]
    public bool isDeleted { get; set; }
}
