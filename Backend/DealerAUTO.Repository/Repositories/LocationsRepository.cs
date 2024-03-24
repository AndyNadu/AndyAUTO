using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DealerAUTO.Repository.Repositories;

public class LocationsRepository : Repository<Location, Guid>, ILocationsRepository
{
    public LocationsRepository(DbContext dbContext) : base(dbContext) { }
    
    public async Task<Location?> GetLocationById(Guid locationId)
    {
        Location? location = await _dbContext.Locations.Where(l =>  l.Id == locationId).FirstOrDefaultAsync();

        return location;
    }
}
