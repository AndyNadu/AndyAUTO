using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace DealerAUTO.DTO.Models
{
    public partial class DealerAUTOContext : DbContext
    {
        public DealerAUTOContext() { }
        public DealerAUTOContext(DbContextOptions<DealerAUTOContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }

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
        }
    }
}
