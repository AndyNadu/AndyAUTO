using DealerAUTO.DTO.Models;
using DealerAUTO.Repository.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DealerAUTO.Repository.Interfaces;

public class EmployeesRepository : Repository<Employee, Guid>, IEmployeesRepository
{
    public EmployeesRepository(DbContext dbContext) : base(dbContext) { }

    public async Task<Employee> GetEmployeeById(Guid employeeID)
    {
        Employee employee = await _dbContext.Employees.Where(e => e.Id == employeeID).FirstOrDefaultAsync();

        return employee;
    }

}
