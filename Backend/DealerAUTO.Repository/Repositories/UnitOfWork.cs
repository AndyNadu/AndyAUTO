using DealerAUTO.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DealerAUTO.Repository.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly DbContext _dbContext;
    public ILocationsRepository Locations { get; set; }

    public UnitOfWork(DbContext dbContext)
    {
        _dbContext = dbContext;
        Locations = new LocationsRepository(dbContext);
    }

}
