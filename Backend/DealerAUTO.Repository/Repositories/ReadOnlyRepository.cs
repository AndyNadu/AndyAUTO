using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;
using System.Linq.Expressions;

namespace DealerAUTO.Repository.Repositories;

public class ReadOnlyRepository<TModel, TKey> : IReadOnlyRepository<TModel, TKey>
    where TModel : class, IEntity<TKey>
    where TKey : class
{
    public Task<IEnumerable<TModel>> GetAllAsync(bool track = true)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<TModel>> GetAsync(Expression<Func<TModel, bool>> predicate, bool track = true)
    {
        throw new NotImplementedException();
    }
}
