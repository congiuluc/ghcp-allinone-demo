# 🟠 Java Spring Boot - GitHub Copilot Code Completions Demo

Complete guide to demonstrate Copilot code completions in Java / Spring Boot.

## 🎯 Demo Overview

Demonstrate code completions for:
- Stream API and lambda expressions
- Spring Data Repository patterns
- POJO models with constructors
- Service layer with business logic
- Collectors API (grouping, mapping)

**Time needed:** 5-15 minutes

---

## 📋 Setup & Prerequisites

### Requirements
- Java 21+
- Maven 3.9+
- VS Code with GitHub Copilot extension
- Spring Boot 3.0+

### Verify Setup
```bash
java -version      # Should show 21+
mvn -version       # Should show 3.9+
```

### Build & Run
```bash
mvn clean install
mvn spring-boot:run    # Runs on http://localhost:8080
```

---

## 🎬 Demo Scenarios

### ⭐ SCENARIO 1: Stream Filter (EASIEST - 1 min)

**File**: `src/main/java/com/demo/service/UserService.java`  
**Method stub**: `getActiveUsersByDepartment(String department)`

**Demo:**
1. Type: `return this.users.stream().filter(`
2. Wait for grey suggestion
3. Copilot suggests: `u -> u.isActive() && u.getDepartment().equals(department)).collect(Collectors.toList());`
4. Press Tab

**What's impressive:**
- Lambda expression syntax
- Property access (getDepartment, isActive)
- Proper Collectors usage
- Parameter integration

**Talk about:**
> "Notice how Copilot knows the Stream API and Collectors pattern? It sees the parameter 'department' and automatically uses it in the filter. That's context awareness."

---

### ⭐⭐ SCENARIO 2: Multiple Filters (MEDIUM - 2 min)

**Method stub**: `searchUsersByName(String searchTerm)`

**Type:**
```java
String term = searchTerm.toLowerCase();
return this.users.stream()
    .filter(u -> u.isActive())
    .filter(u -> u.getName().toLowerCase().contains(
```

**Copilot suggests:**
```java
String term = searchTerm.toLowerCase();
return this.users.stream()
    .filter(u -> u.isActive())
    .filter(u -> u.getName().toLowerCase().contains(term))
    .sorted((a, b) -> a.getName().compareTo(b.getName()))
    .collect(Collectors.toList());
```

**Impressive:**
- Multiple filter chains
- Case-insensitive pattern (toLowerCase)
- Sorting suggestion
- Proper Collectors usage

---

### ⭐⭐⭐ SCENARIO 3: Collectors.groupingBy (ADVANCED - 2 min)

**Method stub**: `getDepartmentStatistics()`

**Type:**
```java
return this.users.stream()
    .collect(Collectors.groupingBy(
```

**Copilot suggests:**
```java
return this.users.stream()
    .collect(Collectors.groupingBy(
        User::getDepartment,
        Collectors.counting()
    ));
```

**Complex because:**
- Method references (User::getDepartment)
- Nested Collectors
- Collectors.counting()
- Return type inference (Map<String, Long>)

**Talk about:**
> "This is advanced - method references, nested collectors, return type inference. Copilot understands the Collectors API completely and knows you want a count."

---

## 💡 Best Practices

### 1. Use Meaningful Variable Names
```java
// BAD - Less context for Copilot
List<User> res = users.stream().filter(...)

// GOOD - Clear intent
List<User> activeUsersInDepartment = users.stream().filter(...)
```

### 2. Break Complex Chains
```java
// BAD - One long line
return users.stream().filter(u -> u.isActive()).filter(u -> u.getDept...

// GOOD - Step by step
return users.stream()
    .filter(u -> u.isActive())
    .filter(u -> u.getDepartment().equals(dept))
    .sorted(Comparator.comparing(User::getName))
    .collect(Collectors.toList());
```

### 3. JavaDoc Guides Copilot
```java
/**
 * Find all active users in a specific department, sorted by name
 * @param department The department to search
 * @return List of active users, ordered by name ascending
 */
public List<User> getActiveUsersByDepartment(String department) {
    // Copilot now knows the complete intent!
}
```

---

## 🆕 DEMO 4: Creating Model + Service from Scratch (5 min)

### Part A: Model Creation

**File**: `src/main/java/com/demo/model/Category.java`

**Step 1: Add properties**
```java
Type:  private int id;
       private String name;
```
- Copilot sees the pattern
- Suggests: description, isActive, createdAt, updatedAt
- Proper type inference

**Step 2: Add constructor**
```java
Type:  public Category(String name)
       {
           this.name = name;
```
- Copilot suggests: this.createdAt = new java.time.LocalDateTime.now();
- Adds: this.isActive = true;

**Step 3: Add getters**
```java
Type:  public String getName()
       {
           return
```
- Copilot completes: return this.name;

### Part B: Service Implementation

**File**: `src/main/java/com/demo/service/CategoryService.java`

**Step 1: Method signatures**
```java
Type:  public List<Category> getAllCategories()
       {
           return this.repository.findAll()
```
- Copilot suggests: .stream().sorted(Comparator.comparing(Category::getName)).collect(Collectors.toList());

**Step 2: Find by ID with null handling**
```java
Type:  public Optional<Category> getCategoryById(int id)
       {
           return this.repository.findById(
```
- Copilot completes: (long) id);

**Step 3: Create with validation**
```java
Type:  public Category createCategory(Category category)
       {
           if (category.getName() == null ||
```
- Copilot suggests: category.getName().isEmpty())
- Then: throw new IllegalArgumentException("Name required");

**Step 4: Search with Stream**
```java
Type:  public List<Category> searchCategories(String term)
       {
           String search = term.toLowerCase();
           return this.repository.findAll().stream()
               .filter(c -> c.getName().toLowerCase().contains(
```
- Copilot completes: search)).collect(Collectors.toList());

**Step 5: Complex aggregation**
```java
Type:  public Map<String, Long> countByStatus()
       {
           return this.repository.findAll().stream()
               .collect(Collectors.groupingBy(
```
- Copilot suggests: Category::getStatus, Collectors.counting());

---

## 📝 Spec-Driven Example

### Demo: Create filtering method from spec

**Step 1: Write the spec first**
```java
/**
 * Find users by multiple criteria
 * 
 * @param department Filter by department name (case-insensitive)
 * @param minSalary Only include users with salary >= minSalary
 * @return Active users matching criteria, sorted by name
 */
public List<User> getActiveUsersByDepartmentAndSalary(
    String department, 
    double minSalary) {
    // TODO: Let Copilot suggest based on the spec
}
```

**Step 2: Type the implementation**
```java
return this.users.stream()
    .filter(u ->
```

**Copilot now knows from the spec:**
- Filter for active users
- Filter by department (case-insensitive match)
- Filter by minimum salary
- Sort by name
- Return as List

**Teaching point:**
> "JavaDoc is like giving Copilot context. It reads your specification and suggests accordingly. Professional teams write documentation first, then code. Copilot helps you build exactly what's documented."

---

## 🆕 DEMO 5: Regex Pattern Matching & Validation (3 min)

### Validate Email with Java Regex

**File**: `src/main/java/com/demo/service/ValidationService.java`

**Step 1: Define validation method**
```java
Type:  private static final String EMAIL_PATTERN =
           "@";
       
       public boolean isValidEmail(String email)
       {
           return Pattern.matches(EMAIL_PATTERN,
```

**Copilot suggests:**
```java
private static final String EMAIL_PATTERN = 
    "^[A-Za-z0-9+_.-]+@(.+)$";
    
public boolean isValidEmail(String email) {
    return Pattern.matches(EMAIL_PATTERN, email);
}
```

**Step 2: Phone validation**
```java
Type:  public boolean isValidPhoneNumber(String phone)
       {
           return Pattern.matches(
```

**Copilot suggests:**
```java
public boolean isValidPhoneNumber(String phone) {
    return Pattern.matches("^\\d{10}$", phone);
}
```

**Step 3: Use in Stream filtering**
```java
Type:  List<User> validUsers = this.users.stream()
           .filter(u ->
```

**Copilot suggests:**
```java
List<User> validUsers = this.users.stream()
    .filter(u -> isValidEmail(u.getEmail()))
    .collect(Collectors.toList());
```

**Teaching points:**
- Java Pattern/Matcher API
- Static final for regex patterns
- Integration with Stream API
- Reusable validators

---

## 🚀 Full Demo Script (15 minutes)

### Opening (1 min)
> "Java has the Stream API and powerful lambda expressions. Copilot understands all of this. Watch how it handles filtering, sorting, and aggregation."

### Demo 1 - Stream Filter (2 min)
- Open UserService.java
- Show method stub for getActiveUsersByDepartment
- Type stream().filter( slowly
- Point out: "See how it knows the lambda parameter names?"
- "Knows to use equals() for department matching?"
- Tab to accept the full suggestion

### Demo 2 - Multiple Conditions (3 min)
- Show searchUsersByName method stub
- Type stream filter chain
- Point out case-insensitive pattern (toLowerCase)
- Show sorting suggestion
- "Copilot chained them correctly"
- Press Tab to accept

### Demo 3 - Advanced Collectors (3 min)
- Show getDepartmentStatistics method stub
- Type: `Collectors.groupingBy(`
- Point out method reference syntax
- "See how it knows User::getDepartment?"
- "Knows to use Collectors.counting()?"
- Tab to accept

### Spec-Driven (3 min)
- Create method with full JavaDoc spec
- Type implementation slowly
- Point out: "All suggestions came from reading the spec"
- Show how clear documentation guides completions

### Build & Test (3 min)
```bash
mvn clean install
mvn spring-boot:run
# In another terminal:
curl http://localhost:8080/api/users/department/Engineering
```

---

## 🎯 Key Teaching Points

### Java Specific
✅ Stream API and lambda expressions  
✅ Collectors API (grouping, mapping, counting)  
✅ Method references (User::getDepartment)  
✅ Optional types  
✅ Pattern/Regex API  

### Code Completions Work Best For
⭐ Boilerplate and CRUD  
⭐ Stream/Collection operations  
⭐ Lambda expressions  
⭐ Repetitive patterns  
⭐ Standard library usage  

---

## ✅ Pre-Demo Checklist

- [ ] Java 21+ installed
- [ ] Maven 3.9+ installed
- [ ] Copilot extension connected
- [ ] Project builds successfully
- [ ] Font size increased (Ctrl+Plus)
- [ ] Dark theme enabled
- [ ] Method stubs cleared
- [ ] Terminal ready for build commands

---

## 🐛 Troubleshooting

### Copilot not suggesting?
- Wait 1-2 seconds for Copilot to think
- Type more context (3-4 characters minimum)
- Check Copilot connection status in status bar
- Reload VS Code (Ctrl+Shift+P → Reload Window)

### Build fails?
```bash
# Clean and rebuild
mvn clean install

# Check Java version
java -version    # Must be 21+

# Check Maven
mvn -version     # Must be 3.9+
```

### Grey suggestion text not visible?
- Increase font size: Ctrl+Plus (3-4 times)
- Change theme: File → Preferences → Theme → Dark Modern
- Check color settings: Java extension settings

---

## 📖 Demo Talking Points

**Why this matters:**
> "Developers spend 30-50% of time on boilerplate. Stream operations, Collections, CRUD - Copilot cuts that dramatically. On complex queries, it saves weeks of thinking."

**About trust:**
> "Copilot's suggestions look good but always verify. It's like pair programming - sometimes perfect, sometimes a starting point. The Stream API, Collectors, and lambda syntax are solid Copilot knowledge areas."

**About the future:**
> "This is how modern development works. AI assistance is becoming standard. Teams using it are shipping 2-3x faster. The skill is in guiding AI, not manual typing."

---

## 🎓 Questions You'll Get

**Q: What if it suggests the wrong Stream operation?**  
A: "Press Escape to dismiss. Type more context. Try again. You stay in control. The more specific your code intent, the better Copilot suggests."

**Q: Does it know about our specific domain models?**  
A: "Not unless you show it. But it knows standard patterns. Train it with your style and naming conventions, and it learns."

**Q: Is it cheating?**  
A: "No - it's like calculators for math. Nobody manually calculates anymore. Copilot is for coding. The skill is knowing what to ask for."

**Q: Will it replace developers?**  
A: "No. It augments. Still need humans for design, architecture, decision-making, code review. Copilot is a tool, not a replacement."

---

**Ready to demo? Type slowly, watch for grey text, press Tab!** 🚀
