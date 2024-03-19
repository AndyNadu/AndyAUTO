#nullable disable

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DealerAUTO.DTO.Models;

public class CarImage : IEntity<Guid, bool>
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public byte[] PhotoAsByteArray { get; set; }

    [ForeignKey("Car")]
    public Guid CarId { get; set; }
    public Car Car { get; set; }

    [Required]
    public bool isDeleted { get; set; }
}
