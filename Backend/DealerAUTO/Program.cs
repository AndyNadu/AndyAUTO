using DealerAUTO.DTO.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//builder.Services.AddScoped<IUserRepository, UserRepository>();
//builder.Services.AddScoped<IUserService, UserService>();

//builder.Services.AddScoped<ICarRepository, CarRepository>();
//builder.Services.AddScoped<ICarService, CarService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AndyAutoDbContext>(options =>
{
    string connectionString = "Server=DESKTOP-1QK3PBD\\SQLEXPRESS;Database=AndyAUTO;Trusted_Connection=True;TrustServerCertificate=True;";
    options.UseSqlServer(connectionString);
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddIdentity<User, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<AndyAutoDbContext>()
    .AddDefaultTokenProviders();

var app = builder.Build();
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
