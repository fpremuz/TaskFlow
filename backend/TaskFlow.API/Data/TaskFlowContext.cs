using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Models; 

namespace TaskFlow.API.Data
{
    public class TaskFlowContext : DbContext
    {
        public TaskFlowContext(DbContextOptions<TaskFlowContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectTask> ProjectTasks { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>()
                .HasMany(p => p.Tasks) 
                .WithOne(t => t.Project)
                .HasForeignKey(t => t.ProjectId); 

            base.OnModelCreating(modelBuilder);
        }
    }
}
