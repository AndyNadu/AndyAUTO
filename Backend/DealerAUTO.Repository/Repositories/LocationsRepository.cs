using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DealerAUTO.Repository.Repositories;

public class LocationsRepository : Repository<Location, Guid>, ILocationsRepository
{
    public LocationsRepository(DbContext dbContext) : base(dbContext) { }
}
