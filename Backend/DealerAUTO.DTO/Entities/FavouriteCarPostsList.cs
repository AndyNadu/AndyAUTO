using System.ComponentModel.DataAnnotations;

namespace DealerAUTO.DTO.Models;

#nullable disable

public class FavouriteCarPostsList : IEntity<Guid>
{
    [Key]
    public Guid Id { get; set; }

    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid CarPostId { get; set; }
    public CarPost CarPost { get; set; }
}
