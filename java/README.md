# ☕ Java Spring Boot - GitHub Copilot Code Completions Demo# ☕ Java Spring Boot - GitHub Copilot Code Completions Demo# ☕ Java Spring Boot - Code Completions Demo



Complete guide to demonstrate Copilot code completions in Java/Spring Boot.



## 🎯 Demo OverviewComplete guide to demonstrate Copilot code completions in Java/Spring Boot with best practices.Demonstrate GitHub Copilot code completions in a Java/Spring Boot project.



**What to demonstrate:**

- Stream API chains (filter, map, collect)

- Service method calls with correct parameters## 🎯 Demo Overview## 📋 What You'll Demo

- Repository queries

- Exception handling

- Model creation from scratch

- Service implementation from scratch**What to demonstrate:**Show how Copilot completes:



**Time needed:** 5-15 minutes depending on depth- Type code slowly → Grey suggestion appears → Press Tab- Stream API chains (filter, map, collect)



---- Press Ctrl+K → See "Next Edit" suggestions- Service method calls with correct parameters



## 📋 Setup & Prerequisites- Spec-driven development with Copilot- Repository queries



### Requirements- Exception handling

- Java 21+

- Maven 3.9+**Time needed:** 5-15 minutes depending on depth- Stream operations

- VS Code with GitHub Copilot extension

- Internet connection (Copilot needs it)



### Verify Setup---## 🎯 Demo Files & Methods

```bash

java -version          # Should show Java 21+

mvn -version          # Should show Maven 3.9+

```## 📋 Setup & Prerequisites### Demo 1: Stream Filter Chain (Easy)



### Build Project**File**: `src/main/java/com/demo/service/UserService.java`

```bash

mvn clean install### Requirements**Method**: `getActiveUsers()`

```

- Java 21+

### Run Project

```bash- Maven 3.9+**What you'll do:**

mvn spring-boot:run

# Server starts at http://localhost:8080- VS Code with GitHub Copilot extension1. Find the method stub

```

- Internet connection (Copilot needs it)2. Type: `return this.users.stream()`

---

3. Copilot suggests (grey): `.filter(user -> user.isActive())`

## 🎬 Demo Scenarios

### Verify Setup4. Press Tab to accept

### ⭐ SCENARIO 1: Stream Filter (EASIEST - 1 min)

```bash5. Type: `.collect(Collectors.toList());`

**File**: `src/main/java/com/demo/service/UserService.java`

java -version          # Should show Java 21+6. Copilot completes it

**Method stub to complete**: `getActiveUsersByDepartment(String department)`

mvn -version          # Should show Maven 3.9+

**Demo steps:**

1. Open the file```**Expected completion:**

2. Find the method with `// TODO: DEMO` comment

3. Position cursor in the empty method body```java

4. **Type slowly:** `return this.users.stream()`

5. **Wait 1-2 seconds** for grey suggestion### Build Projectpublic List<User> getActiveUsers() {

6. Point to grey text: "See Copilot's suggestion?"

7. **Press Tab** to accept```bash    return this.users.stream()

8. Copilot completes the filter chain

mvn clean install        .filter(user -> user.isActive())

**What's impressive:**

- Knows Stream API pattern```        .collect(Collectors.toList());

- Suggests proper lambda syntax

- Knows the Collectors class}



---### Run Project```



### ⭐⭐ SCENARIO 2: Stream API Chain (MEDIUM - 2 min)```bash



**Method stub**: `searchUsers(String searchTerm, String department)`mvn spring-boot:run### Demo 2: Service Method Call (Medium)



**Type slowly:**# Server starts at http://localhost:8080**File**: `src/main/java/com/demo/service/UserService.java`

```java

return getAllUsers().stream().filter(u -> u.getIsActive())```**Method**: `getActiveUsersByDepartment(String department)`

    .filter(u ->

```



**Copilot suggests (grey):**---**What you'll do:**

```java

u.getName().toLowerCase().contains(searchTerm.toLowerCase())1. Type: `return this.users.stream()`

    || u.getEmail().toLowerCase().contains(searchTerm.toLowerCase()))

```## 🎬 Demo Scenarios2. Accept Copilot's filter suggestion



**Why impressive:**3. Type: `.filter(user -> user.getDepartment()`

- Multiple filter conditions

- Case-insensitive search pattern### ⭐ SCENARIO 1: Stream Filter (EASIEST - 1 min)4. Copilot suggests: `.equals(department))`

- String methods (toLowerCase, contains)

- OR operator (||)5. Accept



**Show Ctrl+K:****File**: `src/main/java/com/demo/service/UserService.java`  6. Type: `.collect(Collectors.toList());`

- Press Ctrl+K on next line

- Shows suggestions for: error handling, logging, validation**Method stub to complete**: `getActiveUsersByDepartment(String department)`

- Say: "Next Edit shows what could come next"

**Expected completion:**

---

**Demo steps:**```java

### ⭐⭐⭐ SCENARIO 3: Collectors.groupingBy (ADVANCED - 2 min)

1. Open the filepublic List<User> getActiveUsersByDepartment(String department) {

**Method stub**: `getDepartmentStatistics()`

2. Find the method with `// TODO: DEMO` comment    return this.users.stream()

**Type:**

```java3. Position cursor in the empty method body        .filter(user -> user.isActive())

return getAllUsers().stream().collect(Collectors.groupingBy(

```4. **Type slowly:** `return userRepository.find`        .filter(user -> user.getDepartment().equals(department))



**Copilot suggests (grey):**5. **Wait 1-2 seconds** for grey suggestion        .collect(Collectors.toList());

```java

User::getDepartment,6. Point to grey text: "See Copilot's suggestion?"}

Collectors.counting()

));7. **Press Tab** to accept```

```

8. Copilot completes: `findActiveUsersByDepartment(department);`

**Why it's advanced:**

- Complex Collectors API### Demo 3: Stream Map Transformation (Medium)

- Method reference syntax (::)

- Nested collectors**What's impressive:****File**: `src/main/java/com/demo/service/UserService.java`

- Correct return type (Map<String, Long>)

- Copilot knows Repository method names**Method**: `getUserNames()`

**Narration:**

> "This is complex - method references, nested collectors, return type inference. Copilot understands all of it contextually."- Knows the parameter to pass



---- Understands Spring Data patterns**What you'll do:**



## 🆕 DEMO 4: Creating Model + Service from Scratch (5 min)1. Type: `return this.users.stream()`



See README.md DEMO 4 section below for step-by-step instructions.**Narration:**2. Copilot suggests filter



---> "Copilot suggests exact Repository method names. It knows the parameter and what should be passed. That's framework awareness."3. Type: `.map(user -> user.`



## ⚙️ Setup4. Copilot suggests: `getName())`



### Prerequisites---5. Type: `.collect(Collectors.`

```bash

# Check Java version (need 21+)6. Copilot suggests: `toList());`

java -version

### ⭐⭐ SCENARIO 2: Stream API Chain (MEDIUM - 2 min)

# Check Maven (need 3.9+)

mvn -version**Expected completion:**

```

**Method stub**: `searchUsers(String searchTerm, String department)````java

### Install Dependencies

```bashpublic List<String> getUserNames() {

cd java

mvn clean install**Type slowly:**    return this.users.stream()

```

```java        .map(user -> user.getName())

### Run the Project

```bashreturn getAllUsers().stream().filter(u -> u.getIsActive())        .collect(Collectors.toList());

# Start Spring Boot server

mvn spring-boot:run    .filter(u ->}



# Server runs at http://localhost:8080``````

```



### Test API

```bash**Copilot suggests (grey):**## ⚙️ Setup

# Get all users

curl http://localhost:8080/api/users```java



# Get active usersreturn getAllUsers().stream().filter(u -> u.getIsActive())### Prerequisites

curl http://localhost:8080/api/users/active

    .filter(u -> u.getName().toLowerCase().contains(searchTerm.toLowerCase())```bash

# Search users

curl "http://localhost:8080/api/users/search?query=John"        || u.getEmail().toLowerCase().contains(searchTerm.toLowerCase()))# Check Java version (need 21+)

```

```java -version

---



## 🚀 Full Demo Script (15 minutes)

**Why impressive:**# Check Maven (need 3.9+)

### Opening (1 min)

> "I'm going to show you GitHub Copilot - an AI pair programmer. It's NOT chat mode. It works like autocomplete while you code. Notice how I type, suggestions appear in grey, I press Tab to accept. Let's see it in action."- Multiple filter conditionsmvn -version



### Demo 1 - Simple (2 min)- Case-insensitive search pattern```

- Open UserService.java

- Show method stub- String methods (toLowerCase, contains)

- Type repository method call

- Point to grey suggestion- OR operator (||)### Install Dependencies

- "See how it knows the exact method name?"

- Tab to accept```bash



### Demo 2 - Chain (3 min)**Show Ctrl+K:**cd java

- Show Stream API example

- Type first filter- Press Ctrl+K on next linemvn clean install

- Demonstrate Copilot learning pattern

- Type second filter- Shows suggestions for: error handling, logging, validation```

- "It learned! Now it knows the pattern"

- Show Ctrl+K alternatives- Say: "Next Edit shows what could come next"



### Demo 3 - Complex (3 min)### Run the Project

- Show groupingBy example

- Type slowly---```bash

- Point out: method references, collectors, return types

- "Complex API, all suggested"# Start Spring Boot server

- Tab to accept

### ⭐⭐⭐ SCENARIO 3: Collectors.groupingBy (ADVANCED - 2 min)mvn spring-boot:run

### Demo 4 - NEW: Model + Service (4 min)

**See DEMO 4 section below**



### Build & Test (2 min)**Method stub**: `getDepartmentStatistics()`# Server runs at http://localhost:8080

```bash

mvn clean compile```

mvn spring-boot:run

# In another terminal:**Type:**

curl http://localhost:8080/api/users/active

``````java### Test API

> "The code Copilot suggested - it all works. Not just syntactically correct, logically correct."

return getAllUsers().stream().collect(Collectors.groupingBy(```bash

---

```# Get all users

## 💡 Best Practices Demo

curl http://localhost:8080/api/users

### Show Code Completions Best Practices

**Copilot suggests (grey):**

**1. Type in small chunks**

``````java# Get active users

BAD:  type entire method at once

GOOD: type 3-4 characters, wait for suggestionreturn getAllUsers().stream().collect(Collectors.groupingBy(curl http://localhost:8080/api/users/active

```

    User::getDepartment,

**2. Use descriptive variable names**

```    Collectors.counting()# Search users

BAD:  return users.stream().filter(u -> ...)

GOOD: return users.stream().filter(user -> ...)));curl "http://localhost:8080/api/users/search?query=John"

      // Copilot gets better context

`````````



**3. Leverage type hints**

```

BAD:  List list = repo.find..**Why it's advanced:**## 🎬 Demo Flow

GOOD: List<User> activeUsers = repo.find..

      // Type info helps Copilot- Complex Collectors API

```

- Method reference syntax (::)### Step 1: Open Demo File (15 sec)

**4. Review before accepting**

```- Nested collectors- Open VS Code in the `java` folder

TIP: Copilot isn't always perfect

     Review the suggestion before Tab- Correct return type (Map<String, Long>)- Open `src/main/java/com/demo/service/UserService.java`

     Read it, think about it, then accept

```- Find the first method with `// DEMO TODO:` comment



---**Narration:**



## 📝 Spec-Driven Development Example> "This is complex - method references, nested collectors, return type inference. Copilot understands all of it contextually."### Step 2: Prepare Method (15 sec)



### Demo: Creating a new feature with Copilot- Show audience the method signature



**Scenario:** "Create a method to find users earning above a threshold"---- Delete any implementation code inside



**Step 1: Write the spec/javadoc first**- Leave just the opening brace and empty method

```java

/**## 💡 Best Practices Demo

 * Find all active users earning above a specified salary threshold

 *### Step 3: Type First Completion (1 min)

 * @param minSalary The minimum salary threshold

 * @return List of users earning >= minSalary, sorted by salary descending### Show Code Completions Best Practices- Position cursor at the line where code should go

 */

public List<User> getHighEarningUsers(double minSalary) {- Type: `return this.users.stream()`

    // TODO: Type implementation

}**1. Type in small chunks**- **PAUSE** - wait 1-2 seconds for Copilot

```

```- Grey text appears: `.filter(user -> user.isActive())`

**Step 2: Type the implementation**

- Type: `return getAllUsers().stream().filter(`BAD:  type entire method at once- Say: "Notice the grey text? That's Copilot's suggestion"

- Copilot sees the javadoc and suggests appropriate logic

- Suggests salary comparisonGOOD: type 3-4 characters, wait for suggestion- Press Tab to accept

- Suggests sorting

```- Code is inserted

**Step 3: Press Ctrl+K to refine**

- See alternative filtering approaches

- See sorting options

- Choose the best**2. Use descriptive variable names**### Step 4: Continue to Next Line (1 min)



**Teaching point:**```- Type: `.collect(Collectors.`

> "Writing good specs BEFORE code helps Copilot understand intent better. The javadoc guides Copilot's suggestions. That's professional development."

BAD:  return users.stream().filter(u -> ...)- Copilot suggests: `toList())`

---

GOOD: return users.stream().filter(user -> ...)- Press Tab to accept

## 🆕 DEMO 4: Creating Model + Service from Scratch

      // Copilot gets better context- Type: `;` to complete

### Part A: Model Creation

```

**File**: `src/main/java/com/demo/model/Category.java`

### Step 5: Show Ctrl+K Next Edit (30 sec)

**Step 1: Add properties**

```java**3. Leverage type hints**- Position cursor on a new line

Type:  private String name;

``````- Press Ctrl+K (Windows/Linux) or Cmd+K (Mac)

- Copilot sees the pattern

- It suggests next properties with proper typesBAD:  List list = repo.find...- Dropdown shows suggestions (add error handling, logging, etc.)

- Accept each suggestion

GOOD: List<User> activeUsers = repo.find...- Select one or press Escape

**Expected Copilot suggestions:**

```java      // Type info helps Copilot- Say: "This is 'Next Edit' - Copilot suggests what to do next"

private String description;

private boolean isActive;```

private LocalDateTime createdAt;

private LocalDateTime updatedAt;### Step 6: Repeat with Another Method (1-2 min)

```

**4. Review before accepting**- Move to another demo method

**Step 2: Add constructor**

```java```- Repeat steps 2-4 with a different method

Type:  public Category(String name, String description) {

```TIP: Copilot isn't always perfect- Shows Copilot works on multiple methods

- Copilot suggests field assignments

- Includes timestamp initialization     Review the suggestion before Tab

- Shows: `this.name = name;` `this.description = description;` `this.createdAt = LocalDateTime.now();`

     Read it, think about it, then accept### Step 7: Build & Test (1 min)

**Step 3: Add getters**

```java``````bash

Type:  public String getName() {

       returnmvn clean compile

```

- Copilot completes: `this.name;`---mvn spring-boot:run

- Repeat for other getters (description, isActive, createdAt, updatedAt)

# In another terminal:

**Step 4: Add setters**

```java## 📝 Spec-Driven Development Examplecurl http://localhost:8080/api/users

Type:  public void setName(String name) {

       this```

```

- Copilot suggests: `.name = name;`### Demo: Creating a new feature with Copilot- Show the API works

- Repeat for other setters

- Point out: "The code Copilot suggested actually runs and returns data"

**Step 5: Add equals() method**

```java**Scenario:** "Create a method to find users earning above a threshold"

Type:  public boolean equals(Object o) {

       if (this == o) return true;## 💡 Key Points to Mention

       if (!(o instanceof Category))

```**Step 1: Write the spec/javadoc first**

- Copilot suggests: `return false;`

- Then: `Category category = (Category) o;````java### About Stream API

- Then: `return Objects.equals(id, category.id);`

/**- "Copilot knows Java Stream patterns"

**Step 6: Add hashCode() method**

```java * Find all active users earning above a specified salary threshold- "It knows method names and chaining"

Type:  public int hashCode() {

       return Objects.hash( * - "It understands the data types involved"

```

- Copilot suggests: `id, name, description);` * @param minSalary The minimum salary threshold



**Step 7: Add toString() method** * @return List of users earning >= minSalary, sorted by salary descending### About Suggestions

```java

Type:  public String toString() { * - "These grey suggestions are automatic"

       return "Category{" +

``` * DEMO: Now let Copilot implement this based on the spec- "No special commands - just typing normally"

- Copilot builds the complete string representation

- Shows all fields formatted nicely */- "Framework-aware patterns built in"



### Part B: Service Implementationpublic List<User> getHighEarningUsers(double minSalary) {



**File**: `src/main/java/com/demo/service/CategoryService.java`    // TODO: Type implementation### About Acceptance



**Step 1: Simple GET all with sorting**}- "One Tab keystroke and it's done"

```java

Type:  public List<Category> getAllCategories() {```- "Saves typing the whole chain"

           return categoryRepository.findAll().stream()

```- "Less error-prone than manual typing"

- Copilot suggests: `.sorted(Comparator.comparing(Category::getName))`

- Then: `.collect(Collectors.toList());`**Step 2: Type the implementation**



**Step 2: Find by ID with Optional**- Type: `return getAllUsers().stream().filter(`## 🐛 Troubleshooting

```java

Type:  public Optional<Category> getCategoryById(int id) {- Copilot sees the javadoc and suggests appropriate logic

           return categoryRepository.findById(id)

```- Suggests salary comparison### Copilot Not Suggesting

- Copilot suggests: `.filter(c -> c.isActive());`

- Suggests sorting- Wait 1-2 seconds after typing

**Step 3: Create with validation**

```java- Type a bit more context (3-4 characters minimum)

Type:  public Category createCategory(Category category) {

           if (category.getName() == null ||**Step 3: Press Ctrl+K to refine**- Check Copilot icon in status bar is "Connected"

```

- Copilot suggests: `category.getName().isEmpty()) {`- See alternative filtering approaches- Reload VS Code: Ctrl+Shift+P → "Reload Window"

- Then: `throw new IllegalArgumentException("Name required");`

- Then: `category.setCreatedAt(LocalDateTime.now());`- See sorting options

- Finally: `return categoryRepository.save(category);`

- Choose the best### Grey Text Not Visible

**Step 4: Update with timestamp**

```java- Increase font size: Ctrl+Plus (several times)

Type:  public Category updateCategory(Category category) {

           category.setUpdatedAt(LocalDateTime**Teaching point:**- Use dark theme (default works well)

```

- Copilot suggests: `.now());`> "Writing good specs BEFORE code helps Copilot understand intent better. The javadoc guides Copilot's suggestions. That's professional development."- Check your color theme settings

- Then: `return categoryRepository.save(category);`



**Step 5: Search with multiple conditions**

```java---### Build Issues

Type:  public List<Category> searchCategories(String searchTerm) {

           String term = searchTerm.toLowerCase();- Verify Java 21+ installed: `java -version`

           return categoryRepository.findAll().stream()

               .filter(c -> c.isActive())## 🚀 Full Demo Script (15 minutes)- Verify Maven 3.9+ installed: `mvn -version`

               .filter(c ->

```- Try: `mvn clean && mvn install`

- Copilot suggests:

```java### Opening (1 min)

c.getName().toLowerCase().contains(term) ||

c.getDescription().toLowerCase().contains(term))> "I'm going to show you GitHub Copilot - an AI pair programmer. It's NOT chat mode. It works like autocomplete while you code. Notice how I type, suggestions appear in grey, I press Tab to accept. Let's see it in action."### Spring Boot Won't Run

.collect(Collectors.toList());

```- Check port 8080 is not in use: `netstat -an | findstr 8080`



**Step 6 (ADVANCED): Pagination**### Demo 1 - Simple (2 min)- Kill existing process or use different port

```java

Type:  return categoryRepository.findAll().stream()- Open UserService.java- Check Maven output for error messages

           .skip((long) (page - 1) * size)

           .limit(size)- Show method stub

```

- Copilot suggests: `.collect(Collectors.toList());`- Type repository method call## ✅ Quick Demo Checklist



**Step 7 (EXPERT): Grouping/Aggregation**- Point to grey suggestion

```java

Type:  return categoryRepository.findAll().stream()- "See how it knows the exact method name?"- [ ] Copilot installed & connected

           .collect(Collectors.groupingBy(

```- Tab to accept- [ ] Java 21+ verified

- Copilot suggests: `Category::getDepartment, Collectors.toList()));`

- [ ] Maven 3.9+ verified  

---

### Demo 2 - Chain (3 min)- [ ] Dependencies installed (`mvn install`)

## 🎯 Key Teaching Points

- Show Stream API example- [ ] Font size increased (Ctrl+Plus)

### Copilot Understands:

✅ Framework patterns (Spring Data repositories)- Type first filter- [ ] Demo file opened and ready

✅ Stream API operations and chaining

✅ Lambda expression conventions- Demonstrate Copilot learning pattern- [ ] Method stub prepared (implementation removed)

✅ Type inference from context

✅ Standard library methods- Type second filter- [ ] Tested that Copilot suggestions appear

✅ Professional coding patterns

✅ POJO model generation- "It learned! Now it knows the pattern"- [ ] Tab key accepts suggestions

✅ Service layer patterns

- Show Ctrl+K alternatives- [ ] Ctrl+K shows next edit menu

### Copilot Doesn't:

❌ Create novel business logic (you guide it)- [ ] Build command ready (`mvn clean compile`)

❌ Understand poorly named variables

❌ Work offline (needs internet)### Demo 3 - Complex (3 min)- [ ] Run command ready (`mvn spring-boot:run`)

❌ Replace code review (you verify)

❌ Know your company-specific patterns (unless trained)- Show groupingBy example- [ ] Test endpoint ready (`curl http://localhost:8080/api/users`)



### Best For:- Type slowly

⭐ Boilerplate code

⭐ Repetitive patterns- Point out: method references, collectors, return types## 📚 Reference

⭐ Standard library usage

⭐ CRUD operations- "Complex API, all suggested"

⭐ Framework conventions

⭐ Model creation- Tab to accept- **Full Demo Guide**: ../../COPILOT_CODE_COMPLETIONS_DEMO.md

⭐ Service implementations

- **Quick Start**: ../../QUICK_DEMO_START.md

---

### Spec-Driven (3 min)- **Setup Guide**: ../../README_DEMO_SETUP.md

## 📚 Demo Files Reference

- Create new method stub with javadoc- **All Languages**: See other language folders

### Main Demo File

**`src/main/java/com/demo/service/UserService.java`**- Show how spec guides suggestions



Contains 3 method stubs with TODO comments:- Use Ctrl+K for alternatives---

1. `getActiveUsersByDepartment()` - Repository call

2. `searchUsers()` - Stream with multiple filters- Point: "Good documentation helps Copilot"

3. `getDepartmentStatistics()` - Complex Collectors API

**Ready to demo? Type slowly, watch for grey text, press Tab!** 🚀

### Model + Service Demo Files

**`src/main/java/com/demo/model/Category.java`**### Build & Test (3 min)

- Properties: id, name, description, isActive, createdAt, updatedAt```bash

- Methods to complete: constructor, getters, setters, equals(), hashCode(), toString()mvn clean compile

mvn spring-boot:run

**`src/main/java/com/demo/service/CategoryService.java`**# In another terminal:

- Methods to complete: getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, searchCategories, getActiveCategoriescurl http://localhost:8080/api/users/active

```

### Helper Files> "The code Copilot suggested - it all works. Not just syntactically correct, logically correct."

- `UserRepository.java` - Spring Data repository (reference)

- `UserController.java` - REST endpoints (reference)---

- `User.java` - Entity model

- `CategoryRepository.java` - Category repository## 🎯 Key Teaching Points

- `CategoryController.java` - Category REST endpoints

### Copilot Understands:

---✅ Framework patterns (Spring Data repositories)  

✅ Stream API operations and chaining  

## 🐛 Troubleshooting✅ Lambda expression conventions  

✅ Type inference from context  

### Copilot not suggesting?✅ Standard library methods  

- **Wait 1-2 seconds** - Takes time to think✅ Professional coding patterns  

- **Type more** - Need 3-4 characters of context

- **Check connection** - Copilot icon in status bar should show "Connected"### Copilot Doesn't:

- **Reload VS Code** - Ctrl+Shift+P → "Reload Window"❌ Create novel business logic (you guide it)  

❌ Understand poorly named variables  

### Build fails?❌ Work offline (needs internet)  

```bash❌ Replace code review (you verify)  

# Clean and rebuild❌ Know your company-specific patterns (unless trained)  

mvn clean install

### Best For:

# Check Java version⭐ Boilerplate code  

java -version    # Must be 21+⭐ Repetitive patterns  

⭐ Standard library usage  

# Check Maven⭐ CRUD operations  

mvn -version    # Must be 3.9+⭐ Framework conventions  

```

---

### Can't see grey suggestions?

- **Increase font** - Ctrl+Plus (3-4 times)## 📚 Demo Files Reference

- **Change theme** - Try dark theme (File → Preferences → Theme)

- **Check VS Code version** - Update to latest### Main Demo File

**`src/main/java/com/demo/service/UserService.java`**

---

Contains 3 method stubs with TODO comments:

## ✅ Pre-Demo Checklist1. `getActiveUsersByDepartment()` - Repository call

2. `searchUsers()` - Stream with multiple filters

- [ ] Copilot extension installed3. `getDepartmentStatistics()` - Complex Collectors API

- [ ] Signed in to GitHub (status bar shows connected)

- [ ] Java 21+ verified### Helper Files

- [ ] Maven 3.9+ verified- `UserRepository.java` - Spring Data repository (reference)

- [ ] Project builds successfully- `UserController.java` - REST endpoints (reference)

- [ ] Font size increased (Ctrl+Plus)- `User.java` - Entity model

- [ ] Dark theme enabled

- [ ] UserService.java method stubs cleared (empty bodies)### Also Available

- [ ] Category.java and CategoryService.java ready- `UserServiceDemo.java` - Alternative demo file with additional examples

- [ ] Terminal ready for build commands

- [ ] curl or Postman ready for API testing---



---## 🐛 Troubleshooting



## 📖 Demo Talking Points### Copilot not suggesting?

- **Wait 1-2 seconds** - Takes time to think

**Why this matters:**- **Type more** - Need 3-4 characters of context

> "Developers spend 30-50% of time on boilerplate. Copilot cuts that dramatically. On complex code, it takes weeks to months. Cutting 30% multiplies productivity."- **Check connection** - Copilot icon in status bar should show "Connected"

- **Reload VS Code** - Ctrl+Shift+P → "Reload Window"

**About trust:**

> "Copilot's code looks good but needs review. It's like pair programming - sometimes the suggestion is perfect, sometimes it's a starting point. Always verify."### Build fails?

```bash

**About the future:**# Clean and rebuild

> "This is how modern development works. AI assistance is becoming standard. Teams using it are shipping 2-3x faster. Skill is in guiding AI, not manual typing."mvn clean install



---# Check Java version

java -version    # Must be 21+

## 🎓 Questions You'll Get

# Check Maven

**Q: What if it suggests the wrong thing?**mvn -version    # Must be 3.9+

A: "Press Escape to dismiss. Type more context. Try again. You stay in control."```



**Q: Does it know about our code?**### Can't see grey suggestions?

A: "Not unless you feed it. But it knows standard patterns. Train it with your style."- **Increase font** - Ctrl+Plus (3-4 times)

- **Change theme** - Try dark theme (File → Preferences → Theme)

**Q: Is it cheating?**- **Check VS Code version** - Update to latest

A: "No - it's like calculators for math. Nobody manually calculates anymore. Copilot is for coding."

---

**Q: Will it replace developers?**

A: "No. It augments. Still need humans for design, architecture, decision-making, code review."## ✅ Pre-Demo Checklist



---- [ ] Copilot extension installed

- [ ] Signed in to GitHub (status bar shows connected)

**Ready to demo? Type slowly, watch for grey text, press Tab!** 🚀- [ ] Java 21+ verified

- [ ] Maven 3.9+ verified
- [ ] Project builds successfully
- [ ] Font size increased (Ctrl+Plus)
- [ ] Dark theme enabled
- [ ] UserService.java method stubs cleared (empty bodies)
- [ ] Terminal ready for build commands
- [ ] curl or Postman ready for API testing

---

## 📖 Demo Talking Points

**Why this matters:**
> "Developers spend 30-50% of time on boilerplate. Copilot cuts that dramatically. On complex code, it takes weeks to months. Cutting 30% multiplies productivity."

**About trust:**
> "Copilot's code looks good but needs review. It's like pair programming - sometimes the suggestion is perfect, sometimes it's a starting point. Always verify."

**About the future:**
> "This is how modern development works. AI assistance is becoming standard. Teams using it are shipping 2-3x faster. Skill is in guiding AI, not manual typing."

---

## 🎓 Questions You'll Get

**Q: What if it suggests the wrong thing?**  
A: "Press Escape to dismiss. Type more context. Try again. You stay in control."

**Q: Does it know about our code?**  
A: "Not unless you feed it. But it knows standard patterns. Train it with your style."

**Q: Is it cheating?**  
A: "No - it's like calculators for math. Nobody manually calculates anymore. Copilot is for coding."

**Q: Will it replace developers?**  
A: "No. It augments. Still need humans for design, architecture, decision-making, code review."

