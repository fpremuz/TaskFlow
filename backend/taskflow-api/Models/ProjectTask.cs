namespace TaskFlow.API.Models
{
    public class ProjectTask
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public bool Completed { get; set; } = false;
        public DateTime Deadline { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}