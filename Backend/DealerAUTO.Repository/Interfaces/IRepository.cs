using DealerAUTO.DTO.Models;

namespace DealerAUTO.Repository.Interfaces;

public interface IRepository<TModel, TKey> : IReadOnlyRepository<TModel, TKey>
    where TModel : class, IModel<TKey>
    where TKey : class
{
    void Add(TModel model);
}
