using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DealerAUTO.Repository.Repositories;

public class ReadOnlyRepository<TEntity, TKey> : IReadOnlyRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey, bool>
    where TKey : struct
{

    protected readonly AndyAutoDbContext _dbContext;
    protected readonly DbSet<TEntity> _dbSet;

    public ReadOnlyRepository(DbContext dbContext)
    {
        _dbContext = (AndyAutoDbContext) dbContext;
        _dbSet = dbContext.Set<TEntity>();
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync(bool track = true)
    {
        if (track)
            return await _dbSet.ToListAsync();

        return await _dbSet.AsNoTracking().ToListAsync();
    }
}
