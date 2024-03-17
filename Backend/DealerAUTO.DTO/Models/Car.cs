using System.ComponentModel.DataAnnotations;

namespace DealerAUTO.DTO.Models;

public class Car : IModel<Guid>
{
    public Guid Id { get; set; }

    [Required]
    public string Make { get; set; } = null!;

    [Required]
    public string Model { get; set; } = null!;

    [Required]
    public int Year { get; set; }

    [Required]
    public int Mileage { get; set; }

    [Required]
    public string Description { get; set; } = null!;

    [Required]
    public string Fuel { get; set; } = null!;

    [Required]
    public int CubicCapacity { get; set; }

    [Required]
    public int Power { get; set; }

    [Required]
    public string Transmission { get; set; } = null!;

    [Required]
    public string Traction { get; set; } = null!;

    [Required]
    public string Body { get; set; } = null!;

    [Required]
    public string Wheel { get; set; } = null!;

    [Required]
    public int Price { get; set; }

    [Required]
    public string State { get; set; } = null!;

    [Required]
    public DateTime PostTime { get; set; }

    public Guid CarPost { get; set; }
    public ICollection<CarImage> Images { get; set; } = null!;
}
