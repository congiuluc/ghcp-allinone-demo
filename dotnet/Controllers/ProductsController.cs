using CopilotDemo.Models;
using CopilotDemo.Services;
using Microsoft.AspNetCore.Mvc;

namespace CopilotDemo.Controllers;

/// <summary>
/// REST API controller for product management.
/// Demonstrates Copilot generating REST endpoints and CRUD operations.
/// </summary>
[ApiController]
[Route("api/v1/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    /// <summary>
    /// Get all products
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
    {
        var products = await _productService.GetAllProductsAsync();
        return Ok(products);
    }

    /// <summary>
    /// Get product by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null)
            return NotFound();

        return Ok(product);
    }

    /// <summary>
    /// Create new product
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromBody] Product product)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var createdProduct = await _productService.CreateProductAsync(product);
        return CreatedAtAction(nameof(GetProductById), new { id = createdProduct.Id }, createdProduct);
    }

    /// <summary>
    /// Update product
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> UpdateProduct(int id, [FromBody] Product product)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updatedProduct = await _productService.UpdateProductAsync(id, product);
        if (updatedProduct == null)
            return NotFound();

        return Ok(updatedProduct);
    }

    /// <summary>
    /// Delete product
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var success = await _productService.DeleteProductAsync(id);
        if (!success)
            return NotFound();

        return NoContent();
    }

    /// <summary>
    /// Get products by category
    /// </summary>
    [HttpGet("category/{category}")]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string category)
    {
        var products = await _productService.GetProductsByCategoryAsync(category);
        return Ok(products);
    }

    /// <summary>
    /// DEMO Step 1: Generate endpoint for available products
    /// 
    /// Instructions for Copilot:
    /// "Generate a HttpGet endpoint called GetAvailableProducts that:
    /// - Calls _productService.GetAvailableProductsAsync()
    /// - Returns Ok with the products
    /// - Handles errors with appropriate status codes"
    /// </summary>
    [HttpGet("filter/available")]
    public async Task<ActionResult<IEnumerable<Product>>> GetAvailableProducts()
    {
        // TODO: Let Copilot suggest the implementation
        throw new NotImplementedException("TODO: Implement with Copilot suggestion");
    }

    /// <summary>
    /// DEMO Step 2: Generate endpoint for price range search
    /// 
    /// Instructions for Copilot:
    /// "Generate a HttpGet endpoint that:
    /// - Accepts query parameters minPrice and maxPrice
    /// - Calls GetProductsByPriceRangeAsync
    /// - Validates that minPrice less than maxPrice
    /// - Returns BadRequest if validation fails
    /// - Returns Ok with matching products"
    /// </summary>
    [HttpGet("search/price-range")]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsByPriceRange(
        [FromQuery] decimal minPrice,
        [FromQuery] decimal maxPrice)
    {
        // TODO: Let Copilot suggest the implementation
        throw new NotImplementedException("TODO: Implement with Copilot suggestion");
    }

    /// <summary>
    /// DEMO Step 3: Generate search endpoint
    /// 
    /// Instructions for Copilot:
    /// "Generate a HttpGet endpoint called SearchProducts that:
    /// - Accepts query parameter 'query'
    /// - Calls _productService.SearchProductsAsync(query)
    /// - Returns NotFound if query is empty
    /// - Returns Ok with matching products"
    /// </summary>
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Product>>> SearchProducts([FromQuery] string query)
    {
        // TODO: Let Copilot suggest the implementation
        throw new NotImplementedException("TODO: Implement with Copilot suggestion");
    }
}
