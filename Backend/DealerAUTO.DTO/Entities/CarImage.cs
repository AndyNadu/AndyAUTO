#nullable disable

using System.ComponentModel.DataAnnotations;

namespace DealerAUTO.DTO.Models;

public class CarImage : IEntity<Guid>
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public byte[] PhotoAsByteArray { get; set; }

    public Guid CarId { get; set; }
    public Car Car { get; set; }
}
