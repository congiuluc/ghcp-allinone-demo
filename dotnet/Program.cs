using CopilotDemo.Data;
using CopilotDemo.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("CopilotDemoDB"));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        var allowedOrigins = Environment.GetEnvironmentVariable("ALLOWED_ORIGINS")?.Split(',') 
            ?? new[] { "http://localhost:3000", "http://localhost:5173" };
        builder.WithOrigins(allowedOrigins)
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigins");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Seed initial data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();
    
    if (!dbContext.Products.Any())
    {
        dbContext.Products.AddRange(
            new Models.Product { Id = 1, Name = "Laptop", Price = 1200.00m, Category = "Electronics" },
            new Models.Product { Id = 2, Name = "Mouse", Price = 25.00m, Category = "Accessories" },
            new Models.Product { Id = 3, Name = "Keyboard", Price = 75.00m, Category = "Accessories" }
        );
        dbContext.SaveChanges();
    }
}

app.Run();
