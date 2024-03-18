using System.ComponentModel.DataAnnotations;

#nullable disable

namespace DealerAUTO.DTO.Models;

public class Car : IEntity<Guid>
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Make { get; set; }
    [Required]
    public string Model { get; set; }
    [Required]
    public int Year { get; set; }
    [Required] 
    public int Mileage { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public string Fuel { get; set; }
    [Required]
    public int CubicCapacity { get; set; }
    [Required]
    public int Power { get; set; }
    [Required]
    public string Transmission { get; set; }
    [Required]
    public string Traction { get; set; }
    [Required]
    public string Body { get; set; }
    [Required]
    public string Wheel { get; set; }
    [Required]
    public int Price { get; set; }

    public CarPost CarPost { get; set; }
    public ICollection<CarImage> Images { get; set; }
}
