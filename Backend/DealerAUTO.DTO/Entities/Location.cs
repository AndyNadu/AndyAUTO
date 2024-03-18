using System.ComponentModel.DataAnnotations;

#nullable disable

namespace DealerAUTO.DTO.Models;

public class Location : IEntity<Guid>
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Address { get; set; }

    //public ICollection<Employee> Employees { get; set; }
}
