using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;

namespace DealerAUTO.Repository.Repositories;

public class ReadOnlyRepository<TModel, TKey> : IReadOnlyRepository<TModel, TKey>
    where TModel: class, IModel<TKey>
    where TKey : class
{
}
