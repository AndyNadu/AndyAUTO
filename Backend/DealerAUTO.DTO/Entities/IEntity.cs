namespace DealerAUTO.DTO.Models;

public interface IEntity<Tkey, Tboolean>
{
    Tkey Id { get; }
    Tboolean isDeleted {  get; }
}
