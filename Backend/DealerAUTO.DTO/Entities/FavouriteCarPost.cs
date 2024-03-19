using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DealerAUTO.DTO.Models;

public class FavouriteCarPost : IEntity<Guid, bool>
{
    [Key]
    public Guid Id { get; set; }

    [ForeignKey("User")]
    public Guid UserId { get; set; }
    public User User { get; set; }

    [ForeignKey("CarPost")]
    public Guid CarPostId { get; set; }
    public CarPost CarPost { get; set; }

    [Required]
    public bool isDeleted { get; set; }
}
