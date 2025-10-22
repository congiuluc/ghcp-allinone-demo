namespace CopilotDemo.Models;

using System;
using System.Collections.Generic;

/// <summary>
/// Category model for organizing products.
/// See README.md DEMO 3 for step-by-step instructions.
/// </summary>
public class Category
{
    public int Id { get; set; }
    
    public string? Name { get; set; }
    
    public string? Description { get; set; }
    
    public bool IsActive { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
    
    // TODO: Navigation property for Products
    
    // TODO: Constructor
    
    // TODO: Override ToString()
}
