using CopilotDemo.Models;

namespace CopilotDemo.Services;

/// <summary>
/// Service interface for product operations.
/// Demonstrates Copilot generating service contracts.
/// </summary>
public interface IProductService
{
    Task<IEnumerable<Product>> GetAllProductsAsync();
    Task<Product?> GetProductByIdAsync(int id);
    Task<Product> CreateProductAsync(Product product);
    Task<Product?> UpdateProductAsync(int id, Product product);
    Task<bool> DeleteProductAsync(int id);
    Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category);
    Task<IEnumerable<Product>> GetAvailableProductsAsync();
}
