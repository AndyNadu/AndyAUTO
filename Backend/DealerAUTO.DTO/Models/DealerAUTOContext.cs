using Microsoft.EntityFrameworkCore;

namespace DealerAUTO.DTO.Models
{
    public partial class DealerAUTOContext : DbContext
    {
        public DealerAUTOContext() { }
        public DealerAUTOContext(DbContextOptions<DealerAUTOContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Car> Cars { get; set; }
        public virtual DbSet<Image> Images { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string connectionString = "Server=DESKTOP-1QK3PBD\\SQLEXPRESS;Database=AndyAUTO;Trusted_Connection=True;TrustServerCertificate=True;";

                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.FirstName).HasColumnName("FirstName");
                entity.Property(e => e.LastName).HasColumnName("LastName");
                entity.Property(e => e.Password).HasColumnName("Password");
                entity.Property(e => e.Email).HasColumnName("Email");
                entity.Property(e => e.PhoneNumber).HasColumnName("PhoneNumber");
            });

            modelBuilder.Entity<Car>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.Make).HasColumnName("Make");
                entity.Property(e => e.Model).HasColumnName("Model");
                entity.Property(e => e.Year).HasColumnName("Year");
                entity.Property(e => e.Mileage).HasColumnName("Mileage");
                entity.Property(e => e.Description).HasColumnName("Description");
                entity.Property(e => e.Fuel).HasColumnName("Fuel");
                entity.Property(e => e.CubicCapacity).HasColumnName("CubicCapacity");
                entity.Property(e => e.Power).HasColumnName("Power");
                entity.Property(e => e.Transmission).HasColumnName("Transmission");
                entity.Property(e => e.Traction).HasColumnName("Traction");
                entity.Property(e => e.Body).HasColumnName("Body");
                entity.Property(e => e.Wheel).HasColumnName("Wheel");
                entity.Property(e => e.Price).HasColumnName("Price");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.CarId).HasColumnName("CarId");
                entity.Property(e => e.PhotoAsByteArray).HasColumnName("PhotoAsByteArray");
            });
        }
    }
}
