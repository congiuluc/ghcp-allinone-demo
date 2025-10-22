# 🐍 Python Flask - GitHub Copilot Code Completions Demo

Complete guide to demonstrate Copilot code completions in Python / Flask.

## 🎯 Demo Overview

Demonstrate code completions for:
- Flask route queries
- List filtering with filter()
- Query parameters
- Database queries
- Spec-driven development

**Time needed:** 5-15 minutes

---

## 📋 Setup & Prerequisites

### Requirements
- Python 3.9+
- pip package manager
- VS Code with GitHub Copilot extension
- Internet connection

### Verify Setup
```bash
python --version    # Should show 3.9+
pip --version       # Confirm pip available
```

### Install & Run
```bash
pip install -r requirements.txt
python app.py           # Runs on http://localhost:5000
```

---

## 🎬 Demo Scenarios

### ⭐ SCENARIO 1: Simple Filter (EASIEST - 1 min)

**File**: `routes/student_routes.py`  
**Method stub**: `get_active_students()`

**Demo:**
1. Type: `active_students = [s for s in students if`
2. Wait for grey suggestion
3. Copilot suggests: `s.get('active') == True]`
4. Press Tab

**What's impressive:**
- Python list comprehension
- Dictionary access pattern
- Boolean logic
- Naming conventions

**Talk about:**
> "Python list comprehensions are concise. Copilot knows the idiom. It also knows you're checking for True, not just truthy."

---

### ⭐⭐ SCENARIO 2: Range Query (MEDIUM - 2 min)

**Method stub**: `get_students_by_gpa_range(min_gpa, max_gpa)`

**Type:**
```python
filtered = [s for s in students if s['gpa'] >= min_gpa and s['gpa'] <=
```

**Copilot suggests:**
```python
filtered = [s for s in students if s['gpa'] >= min_gpa and s['gpa'] <= max_gpa]
return jsonify(filtered)
```

**Impressive:**
- Parameter usage
- Multiple conditions
- Return type (jsonify for Flask)
- List comprehension syntax

---

### ⭐⭐⭐ SCENARIO 3: Text Search (ADVANCED - 2 min)

**Method stub**: `search_students(search_term)`

**Type:**
```python
term = search_term.lower()
results = [s for s in students if term in s['name'].lower() or
```

**Copilot suggests:**
- OR condition
- Search in email or other fields
- Case-insensitive handling
- Return with jsonify

**Complex because:**
- Case-insensitive logic
- Multiple field search
- Parameter normalization
- Flask integration

---

## 💡 Best Practices

### 1. Clear Function Signatures
```python
# BAD - Missing context
def search(q):
    ...

# GOOD - Copilot knows what you're searching
def search_students(search_term):
    # Copilot now knows this is student search
    ...
```

### 2. Descriptive Variable Names
```python
# BAD
a = [s for s in st if s['g'] > 3.5]

# GOOD
high_performers = [s for s in students if s['gpa'] > 3.5]
```

### 3. Type Hints (if using Python 3.9+)
```python
from typing import List, Dict

def get_active_students() -> List[Dict]:
    # Copilot understands return type better
    active = [s for s in students if s['active']]
    return active
```

### 4. Docstrings Guide Copilot
```python
def get_students_by_gpa_range(min_gpa: float, max_gpa: float):
    """
    Find students with GPA between min and max values.
    Results are sorted by GPA in descending order.
    """
    # Now Copilot knows to:
    # 1. Filter by range
    # 2. Sort descending
```

---

## 🆕 DEMO 3: Creating Model + Service from Scratch (5 min)

### Part A: Model Creation

**File**: `models/course.py`

**Step 1: Define the class with properties**
```python
Type:  def __init__(self, id: int, name: str, credits: int):
           self.id = id
           self.name = name
           self.credits = credits
```
- Copilot sees the pattern
- Suggests: self.is_active = True
- Suggests: self.created_at = datetime.now()

**Step 2: Add validation method**
```python
Type:  def validate_credits(self) -> bool:
           return self.credits
```
- Copilot suggests: >= 1 and self.credits <= 6

**Step 3: Add status method**
```python
Type:  def get_status(self) -> str:
           if self.
```
- Copilot suggests: is_active:
- Then: return "Active"

**Step 4: Add string representation**
```python
Type:  def __repr__(self) -> str:
           return f"Course({self.id}, {self.name},
```
- Copilot completes with all properties

### Part B: Route/Service Implementation

**File**: `routes/course_routes.py`

**Step 1: GET all courses endpoint**
```python
Type:  @course_bp.route('', methods=['GET'])
       def get_all_courses():
           return jsonify([
```
- Copilot suggests: c.__dict__ for c in courses])
- Or: [json.dumps(c) for c in courses]

**Step 2: GET by ID with error handling**
```python
Type:  @course_bp.route('/<int:course_id>', methods=['GET'])
       def get_course(course_id):
           course = next((c for c in courses if c.id ==
```
- Copilot completes: course_id), None)
- Then: suggests error response if not found

**Step 3: POST create course**
```python
Type:  @course_bp.route('', methods=['POST'])
       def create_course():
           data = request.get_json()
           if not data.get('name'):
               return
```
- Copilot suggests: jsonify({'error': 'Name required'}), 400

**Step 4: Search with filter**
```python
Type:  @course_bp.route('/search', methods=['GET'])
       def search_courses():
           query = request.args.get('q', '').lower()
           results = [c for c in courses if query in c.name.lower()
```
- Copilot suggests: or query in c.description.lower()]
- Then: return jsonify([c.__dict__ for c in results])

**Step 5: Aggregate stats**
```python
Type:  @course_bp.route('/stats', methods=['GET'])
       def get_stats():
           return jsonify({
               'total': len(courses),
               'active':
```
- Copilot calculates: len([c for c in courses if c.is_active])

---

## 📝 Spec-Driven Example

### Demo: Create search from spec-first approach

**Step 1: Write the docstring spec**
```python
def get_students_by_department(department_name: str):
    """
    Get all active students from a specific department.
    Results include: name, email, gpa, enrollment_date.
    Sorted alphabetically by name.
    Only return students with gpa >= 3.0.
    """
    # Let Copilot implement based on spec
```

**Step 2: Start typing implementation**
```python
active_dept_students = [s for s in students if
```

**Copilot now knows from docstring:**
- Filter by department
- Filter by active status
- Filter by GPA >= 3.0
- Sort alphabetically
- Return specific fields

**Teaching point:**
> "Documentation isn't just for humans. Copilot reads docstrings to understand intent. Write the spec, then let it implement."

---

## 🚀 Full Demo Script (15 minutes)

### Opening (1 min)
> "Python has clean syntax. Copilot understands Python idioms well. Watch how it handles Flask queries and list comprehensions."

### Demo 1 - Simple Filter (2 min)
- Open student_routes.py
- Show first method stub
- Type list comprehension slowly
- "See how it knows dictionary access?"
- "Boolean check for active status"
- Tab to accept

### Demo 2 - Range Query (3 min)
- Show second example
- Type range conditions
- "Multiple AND conditions"
- Show jsonify suggestion
- Explain Flask pattern knowledge

### Demo 3 - Advanced Search (3 min)
- Show search example
- Type with .lower() pattern
- "Case-insensitive best practice"
- Multiple field OR logic
- "Complex query, all suggested"

### Spec-Driven (3 min)
- Create method with detailed docstring
- Show how spec guides Copilot
- Type slowly, point out understanding
- Use Ctrl+K for alternatives

### Run & Test (3 min)
```bash
python app.py
# In another terminal:
curl http://localhost:5000/api/students
```

---

## 🎯 Key Teaching Points

### Python Specific
✅ List comprehensions  
✅ Dictionary access patterns  
✅ Type hints  
✅ Flask patterns  
✅ Case-insensitive operations  

### Code Completions Work Best For
⭐ Data filtering  
⭐ Flask routes  
⭐ Repetitive patterns  
⭐ Standard library usage  
⭐ Query operations  

---

## ✅ Pre-Demo Checklist

- [ ] Python 3.9+ installed
- [ ] Copilot connected
- [ ] pip install done
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

### Import errors?
```bash
pip install -r requirements.txt --upgrade
```

### Port 5000 already in use?
```bash
python app.py
# Or set different port:
export FLASK_PORT=5001
python app.py
```

### Grey text not visible?
- Increase font (Ctrl+Plus)
- Change theme
- Check color settings

