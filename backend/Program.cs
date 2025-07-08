using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using TaskFlow.Data;
using DotNetEnv;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration
            .GetConnectionString("DefaultConnection")
            .Replace("${DB_USERNAME}", Environment.GetEnvironmentVariable("DB_USERNAME"))
            .Replace("${DB_PASSWORD}", Environment.GetEnvironmentVariable("DB_PASSWORD"))
    )
);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalFrontend",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") 
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


var app = builder.Build();

app.UseCors("AllowLocalFrontend");

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
