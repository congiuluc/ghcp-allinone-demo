using CopilotDemo.Data;
using CopilotDemo.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CopilotDemo.Services;

/// <summary>
/// Service for Category business logic.
/// See README.md DEMO 3 for step-by-step instructions.
/// </summary>
public interface ICategoryService
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync();
    Task<Category?> GetCategoryByIdAsync(int id);
    Task<Category> CreateCategoryAsync(Category category);
    Task<Category> UpdateCategoryAsync(int id, Category category);
    Task<bool> DeleteCategoryAsync(int id);
    Task<IEnumerable<Category>> SearchCategoriesAsync(string searchTerm);
    Task<IEnumerable<Category>> GetActiveCategoriesAsync();
}

public class CategoryService : ICategoryService
{
    private readonly AppDbContext _context;

    public CategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        // TODO: Implement
        return null;
    }

    public async Task<Category?> GetCategoryByIdAsync(int id)
    {
        // TODO: Implement
        return null;
    }

    public async Task<Category> CreateCategoryAsync(Category category)
    {
        // TODO: Implement
        return null;
    }

    public async Task<Category> UpdateCategoryAsync(int id, Category category)
    {
        // TODO: Implement
        return null;
    }

    public async Task<bool> DeleteCategoryAsync(int id)
    {
        // TODO: Implement
        return false;
    }

    public async Task<IEnumerable<Category>> SearchCategoriesAsync(string searchTerm)
    {
        // TODO: Implement
        return null;
    }

    public async Task<IEnumerable<Category>> GetActiveCategoriesAsync()
    {
        // TODO: Implement
        return null;
    }
}
