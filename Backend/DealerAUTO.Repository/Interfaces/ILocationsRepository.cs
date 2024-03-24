using DealerAUTO.DTO.Models;

namespace DealerAUTO.Repository.Interfaces;

public interface ILocationsRepository : IRepository<Location, Guid>
{
    Task<Location?> GetLocationById(Guid locationId);
}
