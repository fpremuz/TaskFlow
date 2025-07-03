using Microsoft.EntityFrameworkCore;
using TaskFlow.Models;

namespace TaskFlow.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }

        public DbSet<TaskItem> TaskItems { get; set; }

        public DbSet<User> Users { get; set; }  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Role = "Administrator"
                }
            );

            modelBuilder.Entity<Project>().HasData(
                new Project
                {
                    Id = 1,
                    Name = "Demo Project",
                    Description = "A seeded test project",
                    Deadline = DateTime.SpecifyKind(new DateTime(2025, 12, 31), DateTimeKind.Utc),
                    OwnerId = 1
                }
            );

            modelBuilder.Entity<TaskItem>().HasData(
                new TaskItem
                {
                    Id = 1,
                    Title = "First Task",
                    Description = "This task was seeded for testing",
                    DueDate = DateTime.SpecifyKind(new DateTime(2025, 11, 15), DateTimeKind.Utc),
                    IsCompleted = false,
                    Priority = 1,
                    Status = "Pending",
                    ProjectId = 1,
                    AssignedUserId = 1
                }
            );

            modelBuilder.Entity<Project>()
                .HasMany(p => p.Tasks)
                .WithOne(t => t.Project)
                .HasForeignKey(t => t.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TaskItem>()
                .Property(t => t.Status)
                .HasDefaultValue("Pending");
        }
    }
}