using CopilotDemo.Data;
using CopilotDemo.Models;
using Microsoft.EntityFrameworkCore;

namespace CopilotDemo.Services;

/// <summary>
/// Service class implementing product business logic.
/// Demonstrates Copilot generating async/await service methods.
/// </summary>
public class ProductService : IProductService
{
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        return await _context.Products.ToListAsync();
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        return await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Product> CreateProductAsync(Product product)
    {
        product.CreatedAt = DateTime.UtcNow;
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product?> UpdateProductAsync(int id, Product product)
    {
        var existingProduct = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (existingProduct == null)
            return null;

        existingProduct.Name = product.Name;
        existingProduct.Price = product.Price;
        existingProduct.Category = product.Category;
        existingProduct.IsAvailable = product.IsAvailable;
        existingProduct.UpdatedAt = DateTime.UtcNow;

        _context.Products.Update(existingProduct);
        await _context.SaveChangesAsync();
        return existingProduct;
    }

    public async Task<bool> DeleteProductAsync(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (product == null)
            return false;

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category)
    {
        return await _context.Products
            .Where(p => p.Category == category)
            .ToListAsync();
    }

    /// <summary>
    /// DEMO 1: Type the implementation
    /// Hint: Start with: return await _context.Products.Where(
    /// Watch Copilot suggest the LINQ chain
    /// </summary>
    public async Task<IEnumerable<Product>> GetAvailableProductsAsync()
    {
        // TODO: DEMO - Type the implementation
        return await _context.Products
            .Where(p => p.IsAvailable)
            .ToListAsync();
    }

    /// <summary>
    /// DEMO 2: Type the implementation
    /// Hint: Start with: return await _context.Products.Where(p =>
    /// Watch Copilot suggest multiple conditions
    /// </summary>
    public async Task<IEnumerable<Product>> GetProductsByPriceRangeAsync(decimal minPrice, decimal maxPrice)
    {
        // TODO: DEMO - Type the implementation
        return await _context.Products
            .Where(p => p.Price >= minPrice && p.Price <= maxPrice)
            .ToListAsync();
    }

    /// <summary>
    /// DEMO 3: Type the implementation
    /// Hint: Start with: return await _context.Products.Where(
    /// Watch Copilot suggest case-insensitive search logic
    /// </summary>
    public async Task<IEnumerable<Product>> SearchProductsAsync(string searchTerm)
    {
        // TODO: DEMO - Type the implementation
        return await _context.Products
            .Where(p => p.Name.ToLower().Contains(searchTerm.ToLower()))
            .ToListAsync();
    }
}
