namespace DealerAUTO.DTO.DTOs;

public class UserDTO
{
    public Guid? Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Password { get; set; }
    public string? Role {  get; set; }

    public Guid? EmployeeId {  get; set; }
    public string? LocationAddress { get; set; }
    public Boolean? isManager {  get; set; }
}
