# ☕ Java Spring Boot - GitHub Copilot Code Completions Demo# ☕ Java Spring Boot - Code Completions Demo



Complete guide to demonstrate Copilot code completions in Java/Spring Boot with best practices.Demonstrate GitHub Copilot code completions in a Java/Spring Boot project.



## 🎯 Demo Overview## 📋 What You'll Demo



**What to demonstrate:**Show how Copilot completes:

- Type code slowly → Grey suggestion appears → Press Tab- Stream API chains (filter, map, collect)

- Press Ctrl+K → See "Next Edit" suggestions- Service method calls with correct parameters

- Spec-driven development with Copilot- Repository queries

- Exception handling

**Time needed:** 5-15 minutes depending on depth- Stream operations



---## 🎯 Demo Files & Methods



## 📋 Setup & Prerequisites### Demo 1: Stream Filter Chain (Easy)

**File**: `src/main/java/com/demo/service/UserService.java`

### Requirements**Method**: `getActiveUsers()`

- Java 21+

- Maven 3.9+**What you'll do:**

- VS Code with GitHub Copilot extension1. Find the method stub

- Internet connection (Copilot needs it)2. Type: `return this.users.stream()`

3. Copilot suggests (grey): `.filter(user -> user.isActive())`

### Verify Setup4. Press Tab to accept

```bash5. Type: `.collect(Collectors.toList());`

java -version          # Should show Java 21+6. Copilot completes it

mvn -version          # Should show Maven 3.9+

```**Expected completion:**

```java

### Build Projectpublic List<User> getActiveUsers() {

```bash    return this.users.stream()

mvn clean install        .filter(user -> user.isActive())

```        .collect(Collectors.toList());

}

### Run Project```

```bash

mvn spring-boot:run### Demo 2: Service Method Call (Medium)

# Server starts at http://localhost:8080**File**: `src/main/java/com/demo/service/UserService.java`

```**Method**: `getActiveUsersByDepartment(String department)`



---**What you'll do:**

1. Type: `return this.users.stream()`

## 🎬 Demo Scenarios2. Accept Copilot's filter suggestion

3. Type: `.filter(user -> user.getDepartment()`

### ⭐ SCENARIO 1: Stream Filter (EASIEST - 1 min)4. Copilot suggests: `.equals(department))`

5. Accept

**File**: `src/main/java/com/demo/service/UserService.java`  6. Type: `.collect(Collectors.toList());`

**Method stub to complete**: `getActiveUsersByDepartment(String department)`

**Expected completion:**

**Demo steps:**```java

1. Open the filepublic List<User> getActiveUsersByDepartment(String department) {

2. Find the method with `// TODO: DEMO` comment    return this.users.stream()

3. Position cursor in the empty method body        .filter(user -> user.isActive())

4. **Type slowly:** `return userRepository.find`        .filter(user -> user.getDepartment().equals(department))

5. **Wait 1-2 seconds** for grey suggestion        .collect(Collectors.toList());

6. Point to grey text: "See Copilot's suggestion?"}

7. **Press Tab** to accept```

8. Copilot completes: `findActiveUsersByDepartment(department);`

### Demo 3: Stream Map Transformation (Medium)

**What's impressive:****File**: `src/main/java/com/demo/service/UserService.java`

- Copilot knows Repository method names**Method**: `getUserNames()`

- Knows the parameter to pass

- Understands Spring Data patterns**What you'll do:**

1. Type: `return this.users.stream()`

**Narration:**2. Copilot suggests filter

> "Copilot suggests exact Repository method names. It knows the parameter and what should be passed. That's framework awareness."3. Type: `.map(user -> user.`

4. Copilot suggests: `getName())`

---5. Type: `.collect(Collectors.`

6. Copilot suggests: `toList());`

### ⭐⭐ SCENARIO 2: Stream API Chain (MEDIUM - 2 min)

**Expected completion:**

**Method stub**: `searchUsers(String searchTerm, String department)````java

public List<String> getUserNames() {

**Type slowly:**    return this.users.stream()

```java        .map(user -> user.getName())

return getAllUsers().stream().filter(u -> u.getIsActive())        .collect(Collectors.toList());

    .filter(u ->}

``````



**Copilot suggests (grey):**## ⚙️ Setup

```java

return getAllUsers().stream().filter(u -> u.getIsActive())### Prerequisites

    .filter(u -> u.getName().toLowerCase().contains(searchTerm.toLowerCase())```bash

        || u.getEmail().toLowerCase().contains(searchTerm.toLowerCase()))# Check Java version (need 21+)

```java -version



**Why impressive:**# Check Maven (need 3.9+)

- Multiple filter conditionsmvn -version

- Case-insensitive search pattern```

- String methods (toLowerCase, contains)

- OR operator (||)### Install Dependencies

```bash

**Show Ctrl+K:**cd java

- Press Ctrl+K on next linemvn clean install

- Shows suggestions for: error handling, logging, validation```

- Say: "Next Edit shows what could come next"

### Run the Project

---```bash

# Start Spring Boot server

### ⭐⭐⭐ SCENARIO 3: Collectors.groupingBy (ADVANCED - 2 min)mvn spring-boot:run



**Method stub**: `getDepartmentStatistics()`# Server runs at http://localhost:8080

```

**Type:**

```java### Test API

return getAllUsers().stream().collect(Collectors.groupingBy(```bash

```# Get all users

curl http://localhost:8080/api/users

**Copilot suggests (grey):**

```java# Get active users

return getAllUsers().stream().collect(Collectors.groupingBy(curl http://localhost:8080/api/users/active

    User::getDepartment,

    Collectors.counting()# Search users

));curl "http://localhost:8080/api/users/search?query=John"

``````



**Why it's advanced:**## 🎬 Demo Flow

- Complex Collectors API

- Method reference syntax (::)### Step 1: Open Demo File (15 sec)

- Nested collectors- Open VS Code in the `java` folder

- Correct return type (Map<String, Long>)- Open `src/main/java/com/demo/service/UserService.java`

- Find the first method with `// DEMO TODO:` comment

**Narration:**

> "This is complex - method references, nested collectors, return type inference. Copilot understands all of it contextually."### Step 2: Prepare Method (15 sec)

- Show audience the method signature

---- Delete any implementation code inside

- Leave just the opening brace and empty method

## 💡 Best Practices Demo

### Step 3: Type First Completion (1 min)

### Show Code Completions Best Practices- Position cursor at the line where code should go

- Type: `return this.users.stream()`

**1. Type in small chunks**- **PAUSE** - wait 1-2 seconds for Copilot

```- Grey text appears: `.filter(user -> user.isActive())`

BAD:  type entire method at once- Say: "Notice the grey text? That's Copilot's suggestion"

GOOD: type 3-4 characters, wait for suggestion- Press Tab to accept

```- Code is inserted



**2. Use descriptive variable names**### Step 4: Continue to Next Line (1 min)

```- Type: `.collect(Collectors.`

BAD:  return users.stream().filter(u -> ...)- Copilot suggests: `toList())`

GOOD: return users.stream().filter(user -> ...)- Press Tab to accept

      // Copilot gets better context- Type: `;` to complete

```

### Step 5: Show Ctrl+K Next Edit (30 sec)

**3. Leverage type hints**- Position cursor on a new line

```- Press Ctrl+K (Windows/Linux) or Cmd+K (Mac)

BAD:  List list = repo.find...- Dropdown shows suggestions (add error handling, logging, etc.)

GOOD: List<User> activeUsers = repo.find...- Select one or press Escape

      // Type info helps Copilot- Say: "This is 'Next Edit' - Copilot suggests what to do next"

```

### Step 6: Repeat with Another Method (1-2 min)

**4. Review before accepting**- Move to another demo method

```- Repeat steps 2-4 with a different method

TIP: Copilot isn't always perfect- Shows Copilot works on multiple methods

     Review the suggestion before Tab

     Read it, think about it, then accept### Step 7: Build & Test (1 min)

``````bash

mvn clean compile

---mvn spring-boot:run

# In another terminal:

## 📝 Spec-Driven Development Examplecurl http://localhost:8080/api/users

```

### Demo: Creating a new feature with Copilot- Show the API works

- Point out: "The code Copilot suggested actually runs and returns data"

**Scenario:** "Create a method to find users earning above a threshold"

## 💡 Key Points to Mention

**Step 1: Write the spec/javadoc first**

```java### About Stream API

/**- "Copilot knows Java Stream patterns"

 * Find all active users earning above a specified salary threshold- "It knows method names and chaining"

 * - "It understands the data types involved"

 * @param minSalary The minimum salary threshold

 * @return List of users earning >= minSalary, sorted by salary descending### About Suggestions

 * - "These grey suggestions are automatic"

 * DEMO: Now let Copilot implement this based on the spec- "No special commands - just typing normally"

 */- "Framework-aware patterns built in"

public List<User> getHighEarningUsers(double minSalary) {

    // TODO: Type implementation### About Acceptance

}- "One Tab keystroke and it's done"

```- "Saves typing the whole chain"

- "Less error-prone than manual typing"

**Step 2: Type the implementation**

- Type: `return getAllUsers().stream().filter(`## 🐛 Troubleshooting

- Copilot sees the javadoc and suggests appropriate logic

- Suggests salary comparison### Copilot Not Suggesting

- Suggests sorting- Wait 1-2 seconds after typing

- Type a bit more context (3-4 characters minimum)

**Step 3: Press Ctrl+K to refine**- Check Copilot icon in status bar is "Connected"

- See alternative filtering approaches- Reload VS Code: Ctrl+Shift+P → "Reload Window"

- See sorting options

- Choose the best### Grey Text Not Visible

- Increase font size: Ctrl+Plus (several times)

**Teaching point:**- Use dark theme (default works well)

> "Writing good specs BEFORE code helps Copilot understand intent better. The javadoc guides Copilot's suggestions. That's professional development."- Check your color theme settings



---### Build Issues

- Verify Java 21+ installed: `java -version`

## 🚀 Full Demo Script (15 minutes)- Verify Maven 3.9+ installed: `mvn -version`

- Try: `mvn clean && mvn install`

### Opening (1 min)

> "I'm going to show you GitHub Copilot - an AI pair programmer. It's NOT chat mode. It works like autocomplete while you code. Notice how I type, suggestions appear in grey, I press Tab to accept. Let's see it in action."### Spring Boot Won't Run

- Check port 8080 is not in use: `netstat -an | findstr 8080`

### Demo 1 - Simple (2 min)- Kill existing process or use different port

- Open UserService.java- Check Maven output for error messages

- Show method stub

- Type repository method call## ✅ Quick Demo Checklist

- Point to grey suggestion

- "See how it knows the exact method name?"- [ ] Copilot installed & connected

- Tab to accept- [ ] Java 21+ verified

- [ ] Maven 3.9+ verified  

### Demo 2 - Chain (3 min)- [ ] Dependencies installed (`mvn install`)

- Show Stream API example- [ ] Font size increased (Ctrl+Plus)

- Type first filter- [ ] Demo file opened and ready

- Demonstrate Copilot learning pattern- [ ] Method stub prepared (implementation removed)

- Type second filter- [ ] Tested that Copilot suggestions appear

- "It learned! Now it knows the pattern"- [ ] Tab key accepts suggestions

- Show Ctrl+K alternatives- [ ] Ctrl+K shows next edit menu

- [ ] Build command ready (`mvn clean compile`)

### Demo 3 - Complex (3 min)- [ ] Run command ready (`mvn spring-boot:run`)

- Show groupingBy example- [ ] Test endpoint ready (`curl http://localhost:8080/api/users`)

- Type slowly

- Point out: method references, collectors, return types## 📚 Reference

- "Complex API, all suggested"

- Tab to accept- **Full Demo Guide**: ../../COPILOT_CODE_COMPLETIONS_DEMO.md

- **Quick Start**: ../../QUICK_DEMO_START.md

### Spec-Driven (3 min)- **Setup Guide**: ../../README_DEMO_SETUP.md

- Create new method stub with javadoc- **All Languages**: See other language folders

- Show how spec guides suggestions

- Use Ctrl+K for alternatives---

- Point: "Good documentation helps Copilot"

**Ready to demo? Type slowly, watch for grey text, press Tab!** 🚀

### Build & Test (3 min)
```bash
mvn clean compile
mvn spring-boot:run
# In another terminal:
curl http://localhost:8080/api/users/active
```
> "The code Copilot suggested - it all works. Not just syntactically correct, logically correct."

---

## 🎯 Key Teaching Points

### Copilot Understands:
✅ Framework patterns (Spring Data repositories)  
✅ Stream API operations and chaining  
✅ Lambda expression conventions  
✅ Type inference from context  
✅ Standard library methods  
✅ Professional coding patterns  

### Copilot Doesn't:
❌ Create novel business logic (you guide it)  
❌ Understand poorly named variables  
❌ Work offline (needs internet)  
❌ Replace code review (you verify)  
❌ Know your company-specific patterns (unless trained)  

### Best For:
⭐ Boilerplate code  
⭐ Repetitive patterns  
⭐ Standard library usage  
⭐ CRUD operations  
⭐ Framework conventions  

---

## 📚 Demo Files Reference

### Main Demo File
**`src/main/java/com/demo/service/UserService.java`**

Contains 3 method stubs with TODO comments:
1. `getActiveUsersByDepartment()` - Repository call
2. `searchUsers()` - Stream with multiple filters
3. `getDepartmentStatistics()` - Complex Collectors API

### Helper Files
- `UserRepository.java` - Spring Data repository (reference)
- `UserController.java` - REST endpoints (reference)
- `User.java` - Entity model

### Also Available
- `UserServiceDemo.java` - Alternative demo file with additional examples

---

## 🐛 Troubleshooting

### Copilot not suggesting?
- **Wait 1-2 seconds** - Takes time to think
- **Type more** - Need 3-4 characters of context
- **Check connection** - Copilot icon in status bar should show "Connected"
- **Reload VS Code** - Ctrl+Shift+P → "Reload Window"

### Build fails?
```bash
# Clean and rebuild
mvn clean install

# Check Java version
java -version    # Must be 21+

# Check Maven
mvn -version    # Must be 3.9+
```

### Can't see grey suggestions?
- **Increase font** - Ctrl+Plus (3-4 times)
- **Change theme** - Try dark theme (File → Preferences → Theme)
- **Check VS Code version** - Update to latest

---

## ✅ Pre-Demo Checklist

- [ ] Copilot extension installed
- [ ] Signed in to GitHub (status bar shows connected)
- [ ] Java 21+ verified
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

