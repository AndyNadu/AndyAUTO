using DealerAUTO.DTO.Models;

namespace DealerAUTO.Repository.Interfaces;

public interface IEmployeesRepository
{
    Task<Employee> GetEmployeeById(Guid employeeID);
}
