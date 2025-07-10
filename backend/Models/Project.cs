using System;
using System.Collections.Generic;
using TaskFlow.Models;

namespace TaskFlow.Models
{
    public class Project
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime? Deadline { get; set; }

        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();

        public int OwnerId { get; set; }

        public User Owner { get; set; }
    }
}
