using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DealerAUTO.Repository.Repositories;

public class Repository<TEntity, TKey> : ReadOnlyRepository<TEntity, TKey>, IRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey, bool>
    where TKey : struct
{

    public Repository(DbContext dbContext) : base(dbContext)
    {
    }

    public async Task<TEntity> Add(TEntity entity)
    {
        _dbSet.Add(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    public void Update(TEntity entity)
    {
        throw new NotImplementedException();
    }

    public void Delete(TEntity entity)
    {
        throw new NotImplementedException();
    }
}
