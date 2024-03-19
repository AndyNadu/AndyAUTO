using DealerAUTO.DTO.Models;

namespace DealerAUTO.Repository.Interfaces;

public interface IRepository<TEntity, TKey> : IReadOnlyRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey, bool>
    where TKey : class
{
}
