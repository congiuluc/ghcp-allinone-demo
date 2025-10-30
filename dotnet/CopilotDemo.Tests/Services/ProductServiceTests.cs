using CopilotDemo.Data;
using CopilotDemo.Models;
using CopilotDemo.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace CopilotDemo.Tests.Services;

/// <summary>
/// Unit tests for ProductService
/// Tests CRUD operations and business logic for Product management
/// </summary>
public class ProductServiceTests
{
    private DbContextOptions<AppDbContext> CreateNewContextOptions()
    {
        return new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
    }

    private async Task<AppDbContext> GetContextWithData()
    {
        var options = CreateNewContextOptions();
        var context = new AppDbContext(options);

        context.Products.AddRange(
            new Product
            {
                Id = 1,
                Name = "Laptop",
                Price = 999.99m,
                Category = "Electronics",
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow
            },
            new Product
            {
                Id = 2,
                Name = "Mouse",
                Price = 25.99m,
                Category = "Electronics",
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow
            },
            new Product
            {
                Id = 3,
                Name = "Desk",
                Price = 299.99m,
                Category = "Furniture",
                IsAvailable = false,
                CreatedAt = DateTime.UtcNow
            }
        );
        await context.SaveChangesAsync();
        return context;
    }

    [Fact]
    public async Task GetAllProductsAsync_ShouldReturnAllProducts()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.GetAllProductsAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(3, result.Count());
    }

    [Fact]
    public async Task GetProductByIdAsync_ShouldReturnProduct_WhenProductExists()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.GetProductByIdAsync(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Laptop", result.Name);
        Assert.Equal(999.99m, result.Price);
    }

    [Fact]
    public async Task GetProductByIdAsync_ShouldReturnNull_WhenProductDoesNotExist()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.GetProductByIdAsync(999);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task CreateProductAsync_ShouldAddNewProduct()
    {
        // Arrange
        var options = CreateNewContextOptions();
        var context = new AppDbContext(options);
        var service = new ProductService(context);

        var newProduct = new Product
        {
            Name = "Keyboard",
            Price = 79.99m,
            Category = "Electronics",
            IsAvailable = true
        };

        // Act
        var result = await service.CreateProductAsync(newProduct);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Keyboard", result.Name);
        Assert.NotEqual(DateTime.MinValue, result.CreatedAt);

        var allProducts = await context.Products.ToListAsync();
        Assert.Single(allProducts);
    }

    [Fact]
    public async Task UpdateProductAsync_ShouldUpdateExistingProduct()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        var updateData = new Product
        {
            Name = "Gaming Laptop",
            Price = 1499.99m,
            Category = "Electronics",
            IsAvailable = false
        };

        // Act
        var result = await service.UpdateProductAsync(1, updateData);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Gaming Laptop", result.Name);
        Assert.Equal(1499.99m, result.Price);
        Assert.False(result.IsAvailable);
        Assert.NotNull(result.UpdatedAt);
    }

    [Fact]
    public async Task UpdateProductAsync_ShouldReturnNull_WhenProductDoesNotExist()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        var updateData = new Product
        {
            Name = "NonExistent",
            Price = 1.00m,
            Category = "Test",
            IsAvailable = true
        };

        // Act
        var result = await service.UpdateProductAsync(999, updateData);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task DeleteProductAsync_ShouldReturnTrue_WhenProductExists()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.DeleteProductAsync(1);

        // Assert
        Assert.True(result);

        var remainingProducts = await context.Products.ToListAsync();
        Assert.Equal(2, remainingProducts.Count);
        Assert.DoesNotContain(remainingProducts, p => p.Id == 1);
    }

    [Fact]
    public async Task DeleteProductAsync_ShouldReturnFalse_WhenProductDoesNotExist()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.DeleteProductAsync(999);

        // Assert
        Assert.False(result);

        var allProducts = await context.Products.ToListAsync();
        Assert.Equal(3, allProducts.Count);
    }

    [Fact]
    public async Task GetProductsByCategoryAsync_ShouldReturnProductsInCategory()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.GetProductsByCategoryAsync("Electronics");

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
        Assert.All(result, p => Assert.Equal("Electronics", p.Category));
    }

    [Fact]
    public async Task GetProductsByCategoryAsync_ShouldReturnEmpty_WhenNoCategoryMatch()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.GetProductsByCategoryAsync("NonExistent");

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public async Task GetAvailableProductsAsync_ShouldReturnOnlyAvailableProducts()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.GetAvailableProductsAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
        Assert.All(result, p => Assert.True(p.IsAvailable));
    }

    [Fact]
    public async Task GetProductsByPriceRangeAsync_ShouldReturnProductsInRange()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.GetProductsByPriceRangeAsync(20m, 300m);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count()); // Mouse and Desk
        Assert.All(result, p => Assert.InRange(p.Price, 20m, 300m));
    }

    [Fact]
    public async Task GetProductsByPriceRangeAsync_ShouldReturnEmpty_WhenNoPriceMatch()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.GetProductsByPriceRangeAsync(5000m, 6000m);

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public async Task GetProductsByPriceRangeAsync_ShouldIncludeBoundaryValues()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.GetProductsByPriceRangeAsync(25.99m, 25.99m);

        // Assert
        Assert.NotNull(result);
        Assert.Single(result);
        Assert.Equal("Mouse", result.First().Name);
    }

    [Fact]
    public async Task SearchProductsAsync_ShouldReturnMatchingProducts()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.SearchProductsAsync("lap");

        // Assert
        Assert.NotNull(result);
        Assert.Single(result);
        Assert.Equal("Laptop", result.First().Name);
    }

    [Fact]
    public async Task SearchProductsAsync_ShouldBeCaseInsensitive()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.SearchProductsAsync("MOUSE");

        // Assert
        Assert.NotNull(result);
        Assert.Single(result);
        Assert.Equal("Mouse", result.First().Name);
    }

    [Fact]
    public async Task SearchProductsAsync_ShouldReturnEmpty_WhenNoMatch()
    {
        // Arrange
        var context = await GetContextWithData();
        var service = new ProductService(context);

        // Act
        var result = await service.SearchProductsAsync("xyz");

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }
}
