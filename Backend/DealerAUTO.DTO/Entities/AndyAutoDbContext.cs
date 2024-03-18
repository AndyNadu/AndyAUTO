using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;

namespace DealerAUTO.DTO.Models
{
    public partial class AndyAutoDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        //public AndyAutoDbContext(DbContextOptions<AndyAutoDbContext> options) : base(options) { }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        //public virtual DbSet<Car> Cars { get; set; }
        //public virtual DbSet<CarImage> CarImages { get; set; }
        //public virtual DbSet<CarPost> CarPosts { get; set; }
        //public virtual DbSet<FavouriteCarPostsList> FavouriteCarPostsLists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string connectionStringLaptop = "Server=Andy_Laptop\\SQLEXPRESS;Database=AndyAUTO;Trusted_Connection=True;TrustServerCertificate=True;";
                string connectionStringPC = "Server=DESKTOP-1QK3PBD\\SQLEXPRESS;Database=AndyAUTO;Trusted_Connection=True;TrustServerCertificate=True;";

                optionsBuilder.UseSqlServer(connectionStringPC, options => options.MigrationsAssembly("DealerAUTO.DTO"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(entity => entity.Id);
                entity.Property(entity => entity.FirstName).IsRequired();
                entity.Property(entity => entity.LastName).IsRequired();
                entity.Property(entity => entity.Email).IsRequired();
                entity.Property(entity => entity.PasswordHash).IsRequired();
                entity.Property(entity => entity.PhoneNumber).IsRequired();
                entity.Property(entity => entity.Address);

                entity.HasOne<Employee>(entity => entity.Employee)
                      .WithOne(entity => entity.User)
                      .HasForeignKey<User>(entity => entity.EmployeeID)
                      .IsRequired(false);
                .
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.IsManager).IsRequired();

                entity.HasOne<User>(e => e.User)
                    .WithOne(e => e.Employee)
                    .HasForeignKey(e => )
            });
        }
    }
}
