using DealerAUTO.DTO.Models;
using DealerAUTO.Service.AutoMapper;
using DealerAUTO.Service.Interfaces;
using DealerAUTO.Service.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AndyAutoDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("AndyAutoRoxi"));
});

builder.Services.AddScoped<DbContext, AndyAutoDbContext>();
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));


builder.Services.AddTransient<IUserService, UserService>();

builder.Services.AddIdentity<User, IdentityRole<Guid>>(options => { 
    options.SignIn.RequireConfirmedAccount = false;
    options.User.RequireUniqueEmail = true;
})
            .AddEntityFrameworkStores<AndyAutoDbContext>()
            .AddDefaultTokenProviders();

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
