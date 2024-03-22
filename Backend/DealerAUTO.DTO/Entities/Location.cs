using System.ComponentModel.DataAnnotations;

namespace DealerAUTO.DTO.Models;

public class Location : IEntity<Guid, bool>
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Address { get; set; }
    [Required]
    public string PhoneNumber { get; set; }
    [Required]
    public byte[] Image { get; set; }

    public virtual ICollection<Employee>? Employees { get; set; }
    public virtual ICollection<CarPost>? CarPosts { get; set; }

    [Required]
    public bool isDeleted { get; set; }
}
