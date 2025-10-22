# 🔷 .NET ASP.NET Core - GitHub Copilot Code Completions Demo

Complete guide to demonstrate Copilot code completions in C# / ASP.NET Core.

## 🎯 Demo Overview

Demonstrate code completions for:
- LINQ queries with Entity Framework
- Async/await patterns
- Lambda expressions
- Case-insensitive search logic
- Spec-driven development

**Time needed:** 5-15 minutes

---

## 📋 Setup & Prerequisites

### Requirements
- .NET 8 SDK
- VS Code with GitHub Copilot extension
- Internet connection

### Verify Setup
```bash
dotnet --version    # Should show 8.0+
dotnet --info       # See full details
```

### Build & Run
```bash
dotnet restore
dotnet build
dotnet run          # Runs on http://localhost:5000
```

---

## 🎬 Demo Scenarios

### ⭐ SCENARIO 1: Simple LINQ Filter (EASIEST - 1 min)

**File**: `Services/ProductService.cs`  
**Method stub**: `GetAvailableProductsAsync()`

**Demo:**
1. Type: `return await _context.Products.Where(`
2. Wait for grey suggestion
3. Copilot suggests: `p => p.IsAvailable).ToListAsync();`
4. Press Tab

**What's impressive:**
- LINQ syntax
- Async variant (.ToListAsync())
- Property names
- Proper lambda parameter naming

**Talk about:**
> "Notice it knows Entity Framework async patterns. .ToListAsync() instead of .ToList(). That's framework-specific knowledge."

---

### ⭐⭐ SCENARIO 2: Multiple Conditions (MEDIUM - 2 min)

**Method stub**: `GetProductsByPriceRangeAsync(decimal minPrice, decimal maxPrice)`

**Type:**
```csharp
return await _context.Products
    .Where(p => p.IsAvailable && p.Price >= minPrice && p.Price <=
```

**Copilot suggests:**
```csharp
return await _context.Products
    .Where(p => p.IsAvailable && p.Price >= minPrice && p.Price <= maxPrice)
    .OrderBy(p => p.Price)
    .ToListAsync();
```

**Impressive:**
- Multiple AND conditions
- Parameter usage
- Method chaining
- Sorting suggestion

---

### ⭐⭐⭐ SCENARIO 3: Complex Search (ADVANCED - 2 min)

**Method stub**: `SearchProductsAsync(string searchTerm)`

**Type:**
```csharp
var term = searchTerm.ToLower();
return await _context.Products.Where(p => p.IsAvailable &&
    (p.Name.ToLower().Contains(term) ||
```

**Copilot suggests:**
- OR condition completion
- Second property search
- Proper method chaining

**Complex because:**
- Business logic (case-insensitive)
- Multiple search fields
- Proper LINQ patterns
- Async/await

---

## 💡 Best Practices

### 1. Strong Typing Helps
```csharp
// BAD - Less context for Copilot
var result = context.Products.Where(...

// GOOD - Strong typing
IEnumerable<Product> available = context.Products.Where(...
```

### 2. Clear Variable Names
```csharp
// BAD
decimal m = minPrice;
var r = context.Products.Where(p => p.Price >= m

// GOOD
var minPriceFilter = minPrice;
var filteredProducts = context.Products.Where(p => p.Price >= minPriceFilter
```

### 3. XML Documentation Guides Copilot
```csharp
/// <summary>
/// Find available products sorted by price
/// </summary>
/// <returns>List of available products, ordered by price ascending</returns>
public async Task<IEnumerable<Product>> GetAvailableProductsAsync()
{
    // Copilot now knows the intent!
}
```

---

## 🆕 DEMO 3: Creating Model + Service from Scratch (5 min)

### Part A: Model Creation

**File**: `Models/Category.cs`

**Step 1: Add properties with getters/setters**
```csharp
Type:  public int Id { get; set; }
       public string? Name { get; set; }
```
- Copilot sees the pattern
- Suggests: Description, IsActive, CreatedAt, UpdatedAt properties
- Proper nullable typing

**Step 2: Add constructor**
```csharp
Type:  public Category(string? name)
       {
           Name = name;
```
- Copilot suggests field assignments
- Adds: CreatedAt = DateTime.Now;

**Step 3: Override ToString()**
```csharp
Type:  public override string ToString()
       {
           return $"Category{{"
```
- Copilot suggests formatted output string

### Part B: Service Implementation

**File**: `Services/CategoryService.cs`

**Step 1: Method signatures**
```csharp
Type:  public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
       {
           return await _context.Categories
```
- Copilot suggests: .OrderBy(c => c.Name).ToListAsync();

**Step 2: Find by ID with null handling**
```csharp
Type:  public async Task<Category?> GetCategoryByIdAsync(int id)
       {
           return await _context.Categories
               .FirstOrDefaultAsync(c =>
```
- Copilot completes: c.Id == id);

**Step 3: Create with validation**
```csharp
Type:  public async Task<Category> CreateCategoryAsync(Category category)
       {
           if (string.IsNullOrWhiteSpace(category.Name))
               throw new
```
- Copilot suggests: ArgumentException("Name required");
- Then: _context.Categories.Add(category);
- Then: await _context.SaveChangesAsync();

**Step 4: Search with LINQ**
```csharp
Type:  public async Task<IEnumerable<Category>> SearchCategoriesAsync(string term)
       {
           var search = term.ToLower();
           return await _context.Categories
               .Where(c => c.Name.ToLower().Contains(search))
```
- Copilot suggests: .OrderBy(c => c.Name).ToListAsync();

**Step 5: Async patterns**
```csharp
Type:  public async Task<bool> DeleteCategoryAsync(int id)
       {
           var category = await _context.Categories
               .FindAsync(id);
           if (category == null)
```
- Copilot suggests: return false;
- Then: proper deletion flow

---

## 📝 Spec-Driven Example

### Demo: Create filtering method from spec

**Step 1: Write the spec first**
```csharp
/// <summary>
/// Get products in a specific category that are in stock
/// </summary>
/// <param name="category">Product category name</param>
/// <param name="minStock">Minimum stock level required</param>
/// <returns>Available products in category, sorted by name</returns>
public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(
    string category, 
    int minStock)
{
    // TODO: Let Copilot suggest based on the spec
}
```

**Step 2: Type the implementation**
```csharp
return await _context.Products
    .Where(p =>
```

**Copilot now knows from the spec:**
- Filter by category
- Filter by stock level
- Sort by name
- Return as async task

**Teaching point:**
> "XML documentation is like giving Copilot context. It reads the spec and suggests accordingly. Professional teams write documentation first, then code."

---

## 🚀 Full Demo Script (15 minutes)

### Opening (1 min)
> "C# has strong typing and modern async patterns. Copilot understands all of this. Watch how it handles LINQ with Entity Framework."

### Demo 1 - LINQ (2 min)
- Open ProductService.cs
- Show method stub
- Type LINQ query slowly
- "See how it knows Entity Framework?"
- "Knows .ToListAsync()?"
- Tab to accept

### Demo 2 - Multiple Conditions (3 min)
- Show second example
- Type multiple filter conditions
- "Copilot chained them correctly"
- Show ordering suggestion
- Use Ctrl+K for alternatives

### Demo 3 - Advanced Search (3 min)
- Show search example
- Type with ToLower() pattern
- "Shows case-insensitive best practice"
- Multiple property search
- "Complex logic, all suggested"

### Spec-Driven (3 min)
- Create method with XML documentation
- Show how spec guides Copilot
- Type slowly, point out spec understanding
- Use Ctrl+K for alternatives

### Build & Test (3 min)
```bash
dotnet build
dotnet run
# In another terminal:
curl http://localhost:5000/api/products
```

---

## 🎯 Key Teaching Points

### C# / .NET Specific
✅ Async/await patterns  
✅ LINQ operators  
✅ Entity Framework knowledge  
✅ Type inference  
✅ Generic types  

### Code Completions Work Best For
⭐ Boilerplate  
⭐ CRUD operations  
⭐ Framework patterns  
⭐ Repetitive code  
⭐ Standard library usage  

---

## ✅ Pre-Demo Checklist

- [ ] .NET 8 SDK installed
- [ ] Copilot connected
- [ ] Project builds
- [ ] Font size increased
- [ ] Dark theme enabled
- [ ] Method stubs cleared
- [ ] Terminal ready

---

## 🐛 Troubleshooting

### Copilot not suggesting?
- Wait 1-2 seconds
- Type more context
- Check Copilot status bar
- Reload VS Code

### Build fails?
```bash
dotnet clean
dotnet restore
dotnet build
```

### Grey text not visible?
- Increase font (Ctrl+Plus)
- Change theme
- Check color settings

