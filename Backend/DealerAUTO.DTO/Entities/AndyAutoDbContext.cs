using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DealerAUTO.DTO.Models
{
    public partial class AndyAutoDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public AndyAutoDbContext(DbContextOptions<AndyAutoDbContext> options) : base(options) { }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Car> Cars { get; set; }
        public virtual DbSet<CarImage> CarImages { get; set; }
        public virtual DbSet<CarPost> CarPosts { get; set; }
        public virtual DbSet<FavouriteCarPost> FavouriteCarPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FavouriteCarPost>()
                .HasOne(f => f.CarPost)
                .WithMany()
                .HasForeignKey(f => f.CarPostId)
                .OnDelete(DeleteBehavior.Restrict);
            base.OnModelCreating(modelBuilder);
        }
    }
}
