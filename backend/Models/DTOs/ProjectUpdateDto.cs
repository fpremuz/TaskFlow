namespace TaskFlow.Models.DTOs
{
    public class ProjectUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime? Deadline { get; set; }
    }
}