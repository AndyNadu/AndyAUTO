namespace DealerAUTO.Repository.Interfaces;

public interface IUnitOfWork
{
    ILocationsRepository Locations { get; set; }
    IEmployeesRepository Employees { get; set; }
}
