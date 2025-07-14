namespace TaskFlow.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public ICollection<Role> Roles { get; set; } = new List<Role>();
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}