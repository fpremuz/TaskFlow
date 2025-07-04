using System;

namespace TaskFlow.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime? DueDate { get; set; }

        public bool IsCompleted { get; set; }

        public int Priority { get; set; }

        public string Status { get; set; }

        public int ProjectId { get; set; }

        public Project Project { get; set; }

        public int? AssignedUserId { get; set; }

        public User AssignedUser { get; set; }
    }
}
