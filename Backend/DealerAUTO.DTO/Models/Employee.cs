using System.ComponentModel.DataAnnotations;

namespace DealerAUTO.DTO.Models;

public class Employee : IModel<Guid>
{
    public Guid Id { get; set; }

    [Required]
    public bool IsManager { get; set; }

    [Required]
    public Guid LocationId { get; set; }

    [Required]
    public User User { get; set; } = null!;
}
