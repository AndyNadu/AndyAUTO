using System.ComponentModel.DataAnnotations;

namespace DealerAUTO.DTO.Models;

public class Location : IModel<Guid>
{
    public Guid Id { get; set; }

    [Required]
    public string Address { get; set; } = null!;

    public ICollection<Employee> Employees { get; set; } = null!;
}
