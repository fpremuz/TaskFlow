using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskFlow.Data;
using TaskFlow.Models;
using TaskFlow.Models.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace TaskFlow.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: /api/projects
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrWhiteSpace(username))
                return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
                return Unauthorized();

            var projects = await _context.Projects
                .Where(p => p.OwnerId == user.Id)
                .Include(p => p.Owner)
                .Include(p => p.Tasks)
                .ToListAsync();

            return Ok(projects);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject(ProjectCreateDto dto)
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrWhiteSpace(username))
                return Unauthorized();

            var owner = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (owner == null)
                return Unauthorized();

            var project = new Project
            {
                Name = dto.Name,
                Description = dto.Description,
                Owner = owner,
                Deadline = dto.Deadline
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            await _context.Entry(project).Reference(p => p.Owner).LoadAsync();

            return CreatedAtAction(nameof(GetProjects), new { id = project.Id }, project);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] ProjectUpdateDto dto)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return NotFound();

            project.Name = dto.Name;
            project.Description = dto.Description;
            project.Deadline = dto.Deadline;

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
