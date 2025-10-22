# ⚛️ React 18 - GitHub Copilot Code Completions Demo

Complete guide to demonstrate Copilot code completions in React.

## 🎯 Demo Overview

Demonstrate code completions for:
- React hooks usage
- Array filtering and mapping
- Component state management
- Conditional rendering
- Spec-driven development

**Time needed:** 5-15 minutes

---

## 📋 Setup & Prerequisites

### Requirements
- Node.js 16+
- npm package manager
- VS Code with GitHub Copilot extension
- Internet connection

### Verify Setup
```bash
node --version      # Should show 16+
npm --version       # Confirm npm available
```

### Install & Run
```bash
npm install
npm run dev          # Runs on http://localhost:5173
```

---

## 🎬 Demo Scenarios

### ⭐ SCENARIO 1: Simple Filter (EASIEST - 1 min)

**File**: `src/components/TodoList.jsx`  
**Method stub**: `getCompletedTodos()`

**Demo:**
1. Type: `return todos.filter(t =>`
2. Wait for grey suggestion
3. Copilot suggests: `t.completed).length;`
4. Press Tab

**What's impressive:**
- React hook knowledge
- Array filter method
- Property access (todos state)
- Count operation

**Talk about:**
> "Copilot knows React hooks and your component state. It knows todos is an array, and suggests the right filter."

---

### ⭐⭐ SCENARIO 2: Count with Ternary (MEDIUM - 2 min)

**Method stub**: `getPendingCount()`

**Type:**
```javascript
return todos.length > 0 ? todos.filter(t =>
```

**Copilot suggests:**
```javascript
return todos.length > 0 ? todos.filter(t => !t.completed).length : 0;
```

**Impressive:**
- Ternary operator
- Negative condition (!t.completed)
- Safe count (prevents errors)
- Defensive programming

---

### ⭐⭐⭐ SCENARIO 3: Complex Render Logic (ADVANCED - 2 min)

**Method stub**: `getPendingTodos()`

**Type:**
```javascript
const pending = todos.filter(t => !t.completed);
return pending.length > 0 ? pending : [];
```

**Then in render:**
```javascript
{pending.length > 0 && pending.map((todo, index) =>
```

**Copilot suggests:**
- JSX with map
- Key prop
- todo properties access
- Proper React rendering

**Complex because:**
- State management
- Filtering logic
- Conditional rendering
- JSX syntax

---

## 💡 Best Practices

### 1. Use Descriptive Names
```javascript
// BAD
const t = todos.filter(x => x.c);

// GOOD
const completedTodos = todos.filter(todo => todo.completed);
```

### 2. Memoize Expensive Operations
```javascript
// Copilot helps with useMemo too:
const completedTodos = useMemo(
    () => todos.filter(t => t.completed),
    [todos]
);
```

### 3. Use Custom Hooks
```javascript
// Create a custom hook, Copilot suggests implementation
function useTodoFilters() {
    return {
        completed: todos.filter(t => t.completed),
        pending: todos.filter(t => !t.completed),
    };
}
```

### 4. JSDoc for Complex Logic
```javascript
/**
 * Calculate completion percentage
 * @returns {number} Percentage of completed todos (0-100)
 */
function getCompletionPercentage() {
    if (todos.length === 0) return 0;
    const completed = todos.filter(t => t.completed).length;
    return (completed / todos.length) * 100;
}
```

---

## 🆕 DEMO 3: Creating Custom Hook + Model from Scratch (5 min)

### Part A: Model Creation

**File**: `src/models/Project.ts`

**Step 1: Define the interface**
```typescript
Type:  export interface Project {
           readonly id: number;
           name: string;
           status: 'active' | 'pending' |
```
- Copilot suggests: 'completed';
- Suggests: team: string[];
- Suggests: progress: number;

**Step 2: Add helper functions**
```typescript
Type:  export function isOverdue(project: Project): boolean {
           return project.endDate <
```
- Copilot suggests: new Date();

**Step 3: Add stats interface**
```typescript
Type:  export interface ProjectStats {
           total: number;
           active:
```
- Copilot suggests remaining stat fields

### Part B: Custom Hook Implementation

**File**: `src/hooks/useProjectService.js`

**Step 1: Setup hook with state**
```javascript
Type:  export function useProjectService() {
           const [projects, setProjects] = useState([...]);
           const [filter, setFilter] = useState('all');
           
           const filteredProjects = useMemo(() =>
```
- Copilot suggests: projects.filter(p => ...)

**Step 2: Memoized search**
```javascript
Type:  const searchProjects = useMemo(() => {
           return projects.filter(p =>
```
- Copilot completes case-insensitive search

**Step 3: Callback for add project**
```javascript
Type:  const addProject = useCallback((newProject) => {
           setProjects(prev => [...prev,
```
- Copilot suggests: { ...newProject, id: Date.now() }

**Step 4: Callback for update**
```javascript
Type:  const updateProject = useCallback((id, updates) => {
           setProjects(prev =>
               prev.map(p =>
```
- Copilot suggests: p.id === id ? {...p, ...updates} : p

**Step 5: Memoized aggregation**
```javascript
Type:  const getStats = useMemo(() => {
           return {
               total: projects.length,
               active:
```
- Copilot completes with filtering for active projects

**Step 6: Return hook object**
```javascript
Type:  return {
           projects: filteredProjects,
           addProject,
           updateProject,
```
- Copilot suggests all state and memoized values

---

## 📝 Spec-Driven Example

### Demo: Add feature from spec

**Step 1: Write the spec as comments**
```javascript
// NEW FEATURE: Get todos filtered by priority
// - Show only HIGH and MEDIUM priority items
// - Sort by priority (HIGH first)
// - Sort by creation date (newest first)
// - Only show pending items
function getHighPriorityPending() {
    // Let Copilot implement based on spec
}
```

**Step 2: Start typing**
```javascript
return todos
    .filter(t =>
```

**Copilot now knows:**
- Filter by priority (HIGH, MEDIUM)
- Filter by completed status
- Sort by priority
- Sort by date
- Return sorted array

**Teaching point:**
> "Write the requirement in comments. Copilot reads it and implements exactly what you described. This is test-driven development."

---

## 🆕 DEMO 5: Regex Pattern Matching & Validation (3 min)

### Validate in React Components

**File**: `src/utils/validators.js` or component

**Step 1: Create validation function**
```javascript
Type:  export const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@(.+)$/;
       
       export function isValidEmail(email) {
           return EMAIL_REGEX.test(
```

**Copilot suggests:**
```javascript
return EMAIL_REGEX.test(email);
```

**Step 2: Password validation with strength**
```javascript
Type:  export const PASSWORD_REGEX = {
           uppercase: /[A-Z]/,
           lowercase: /[a-z]/,
           number: /[0-9]/,
           special: /[!@#$%^&*]/
       };
       
       export function validatePassword(pwd) {
           return Object.values(PASSWORD_REGEX).every(regex =>
```

**Copilot suggests:**
```javascript
return Object.values(PASSWORD_REGEX).every(regex => regex.test(pwd));
```

**Step 3: Use in component state**
```javascript
Type:  const [email, setEmail] = useState('');
       const isValid = useMemo(() =>
```

**Copilot suggests:**
```javascript
const isValid = useMemo(() => isValidEmail(email), [email]);
```

**Step 4: Display validation UI**
```javascript
Type:  <input
           type="email"
           onChange={(e) => setEmail(e.target.value)}
           className={isValid ? 'valid' :
```

**Copilot suggests:**
```javascript
className={isValid ? 'valid' : 'invalid'}
```

**Teaching points:**
- JavaScript regex in React
- Integration with useState/useMemo
- Real-time validation
- User feedback patterns

---

## 🚀 Full Demo Script (18 minutes)

### Opening (1 min)
> "React has hooks and JSX. Copilot understands both perfectly. Watch how it handles component state, filtering, and rendering."

### Demo 1 - Simple Filter (2 min)
- Open TodoList.jsx
- Show first method stub
- Type filter slowly
- "See how it knows the todos property?"
- "Knows filter pattern"
- Tab to accept

### Demo 2 - Count Logic (3 min)
- Show second example
- Type ternary operator
- "Defensive programming - check length first"
- Show negation (!t.completed)
- "Zero if empty"

### Demo 3 - Render Logic (3 min)
- Show complex example
- Type filter assignment
- "Maps to JSX"
- Show key prop suggestion
- "Knows React rendering best practices"

### Spec-Driven (3 min)
- Create method with detailed comments
- Show how spec guides implementation
- Type slowly, point out accuracy
- Use Ctrl+K for alternatives

### Run & Test (3 min)
```bash
npm run dev
# Open http://localhost:5173 in browser
```

---

## 🎯 Key Teaching Points

### React Specific
✅ JSX syntax  
✅ useState, useMemo hooks  
✅ Array methods in components  
✅ Conditional rendering  
✅ Key props for lists  

### Code Completions Work Best For
⭐ Filtering operations  
⭐ Array mapping  
⭐ Conditional rendering  
⭐ Hook usage patterns  
⭐ Component state logic  

---

## ✅ Pre-Demo Checklist

- [ ] Node.js 16+ installed
- [ ] Copilot connected
- [ ] npm install done
- [ ] Font size increased
- [ ] Dark theme enabled
- [ ] Method stubs cleared
- [ ] Terminal & browser ready

---

## 🐛 Troubleshooting

### Copilot not suggesting?
- Wait 1-2 seconds
- Type more context
- Check Copilot status bar
- Reload VS Code

### npm install fails?
```bash
npm cache clean --force
npm install
```

### Port 5173 in use?
```bash
npm run dev
# Vite will use next available port
```

### Grey text not visible?
- Increase font (Ctrl+Plus)
- Change theme
- Check color settings

