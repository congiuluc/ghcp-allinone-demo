namespace CopilotDemo.Models;

/// <summary>
/// Product entity model representing a product in the inventory.
/// Demonstrates Copilot's ability to generate entity models with proper annotations.
/// </summary>
public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string Category { get; set; } = string.Empty;

    public bool IsAvailable { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
}
