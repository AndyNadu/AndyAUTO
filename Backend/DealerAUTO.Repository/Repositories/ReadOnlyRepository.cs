using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;
using System.Linq.Expressions;

namespace DealerAUTO.Repository.Repositories;

public class ReadOnlyRepository<TEntity, TKey> : IReadOnlyRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey, bool>
    where TKey : class
{
}
