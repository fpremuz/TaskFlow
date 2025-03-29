namespace TaskFlow.API.Models
{
    public class Project
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public required ICollection<ProjectTask> Tasks { get; set; } = new List<ProjectTask>();   
    }
}