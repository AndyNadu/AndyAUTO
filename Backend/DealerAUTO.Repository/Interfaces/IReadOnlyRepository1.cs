using DealerAUTO.DTO.Models;
using System.Linq.Expressions;

namespace DealerAUTO.Repository.Interfaces;

public interface IReadOnlyRepository<TModel, TKey>
    where TModel : class, IModel<TKey>
    where TKey : class
{
    Task<IEnumerable<TModel>> GetAllAsync(bool track = true);
    Task<IEnumerable<TModel>> GetAsync(Expression<Func<TModel, bool>> predicate, bool track = true);
}
