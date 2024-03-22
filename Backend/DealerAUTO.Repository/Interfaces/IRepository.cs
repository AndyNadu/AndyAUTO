using DealerAUTO.DTO.Models;

namespace DealerAUTO.Repository.Interfaces;

public interface IRepository<TEntity, TKey> : IReadOnlyRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey, bool>
    where TKey : struct
{
    public Task<TEntity> Add(TEntity entity);
    void Update(TEntity entity);
    void Delete(TEntity entity);
}
