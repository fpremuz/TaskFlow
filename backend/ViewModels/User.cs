namespace TaskFlow.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; } 
        public ICollection<TaskItem> Tasks { get; set; }
    }
}