# 🏛️ COBOL Legacy System - GitHub Copilot Code Completions Demo

Complete guide to demonstrate Copilot code completions in GnuCOBOL.

## 🎯 Demo Overview

Demonstrate code completions for:
- COBOL calculation logic
- Working with records/structures
- Data transformation
- Conditional statements
- Legacy system modernization patterns

**Time needed:** 5-15 minutes

---

## 📋 Setup & Prerequisites

### Requirements
- GnuCOBOL compiler installed
- VS Code with GnuCOBOL extension (optional but helpful)
- GitHub Copilot extension
- Internet connection

### Verify Setup
```bash
cobc --version      # Should show GnuCOBOL version
cobc --info         # See full details
```

### Build & Run
```bash
cobc -x PROGRAM.cbl -o program     # Compile
./program                           # Run (or program.exe on Windows)
```

---

## 🎬 Demo Scenarios

### ⭐ SCENARIO 1: Simple Calculation (EASIEST - 1 min)

**File**: `PROGRAM.cbl`  
**Paragraph stub**: `CALCULATE-DEDUCTIONS`

**Demo:**
1. Look at WORKING-STORAGE section
2. Type: `COMPUTE TAX = GROSS-SALARY *`
3. Wait for grey suggestion
4. Copilot suggests: `0.15.`
5. Press Tab

**What's impressive:**
- COBOL calculation syntax
- Knows multiplier pattern (percentage)
- Proper decimal format
- Period termination

**Talk about:**
> "COBOL is still used in Fortune 500 companies. Copilot understands legacy syntax. Watch how it handles structured calculations."

---

### ⭐⭐ SCENARIO 2: Multiple Calculations (MEDIUM - 2 min)

**Paragraph or section to fill:**

**Type:**
```cobol
COMPUTE DEDUCTION = TAX + INSURANCE + RETIREMENT.
COMPUTE NET-SALARY = GROSS-SALARY -
```

**Copilot suggests:**
```cobol
COMPUTE NET-SALARY = GROSS-SALARY - DEDUCTION.
```

**Impressive:**
- Variable naming conventions
- Calculation flow
- Proper COBOL punctuation
- Logical sequence

---

### ⭐⭐⭐ SCENARIO 3: Conditional Logic (ADVANCED - 2 min)

**Type:**
```cobol
IF GROSS-SALARY > 50000
    COMPUTE TAX = GROSS-SALARY * 0.25
ELSE
    COMPUTE TAX = GROSS-SALARY *
```

**Copilot suggests:**
- Proper calculation for different bracket
- Complete structure
- Proper indentation
- END-IF statement

**Complex because:**
- Conditional logic
- Multiple branches
- Tax bracket calculation
- Proper COBOL structure

---

## 💡 Best Practices

### 1. Clear Field Names (PIC Clause)
```cobol
* BAD - Unclear
77 GS PIC 9(8)V99.

* GOOD - Self-documenting
77 GROSS-SALARY PIC 9(8)V99.
```

### 2. Group Related Data
```cobol
* Copilot can better understand grouped data
01 EMPLOYEE-RECORD.
   05 EMPLOYEE-NAME PIC X(30).
   05 EMPLOYEE-ID PIC 9(6).
   05 DEPARTMENT PIC X(20).
   05 SALARY-INFO.
       10 GROSS-SALARY PIC 9(8)V99.
       10 DEDUCTIONS PIC 9(8)V99.
```

### 3. Use Meaningful Paragraphs
```cobol
* Copilot understands this structure better:
IDENTIFICATION DIVISION.
PROGRAM-ID. PAYROLL-SYSTEM.

PROCEDURE DIVISION.
    CALCULATE-NET-SALARY.
        PERFORM VALIDATE-EMPLOYEE.
        PERFORM CALCULATE-TAX.
        PERFORM CALCULATE-DEDUCTIONS.
        STOP RUN.
```

### 4. Comments Explain Intent
```cobol
    * Calculate tax using progressive bracket system
    * Gross > $50K: 25%, otherwise 15%
    EVALUATE TRUE
        WHEN GROSS-SALARY > 50000
            COMPUTE TAX = GROSS-SALARY * 0.25
        WHEN OTHER
            COMPUTE TAX = GROSS-SALARY * 0.15
    END-EVALUATE.
```

---

## 📝 Spec-Driven Example

### Demo: Add payroll calculation from spec

**Step 1: Write the requirement as comments**
```cobol
    * NEW REQUIREMENT: Calculate bonuses
    * - 10% bonus if gross > $75K
    * - 5% bonus if gross > $50K
    * - No bonus if gross <= $50K
    * - Store result in BONUS field
    PERFORM CALCULATE-BONUS.
```

**Step 2: Start the calculation section**
```cobol
CALCULATE-BONUS.
    EVALUATE TRUE
        WHEN GROSS-SALARY > 75000
            COMPUTE BONUS = GROSS-SALARY *
```

**Copilot now knows:**
- Bonus percentages
- Conditional logic
- Which salary level applies
- Proper COBOL structure

**Teaching point:**
> "Legacy systems need modernization help. Copilot understands COBOL AND modern patterns. You can improve old code with AI assistance."

---

## 🚀 Full Demo Script (15 minutes)

### Opening (1 min)
> "COBOL powers trillions of dollars in transactions daily. Copilot now understands COBOL syntax. Watch how it handles structured calculations and legacy code patterns."

### Demo 1 - Simple Calculation (2 min)
- Open PROGRAM.cbl
- Show WORKING-STORAGE with field definitions
- Type calculation
- "See how it knows the tax percentage?"
- "Proper COBOL syntax"
- Tab to accept

### Demo 2 - Multiple Calculations (3 min)
- Show second example
- Type multiple COMPUTE statements
- "Understands salary breakdown"
- "Variable naming conventions"
- "Logical sequence"

### Demo 3 - Conditional (3 min)
- Show EVALUATE structure
- Type conditional logic
- "Tax bracket logic"
- "Proper COBOL structure"
- Use Ctrl+K for alternatives

### Spec-Driven (3 min)
- Create new calculation from spec comments
- Show how spec guides implementation
- Type slowly, point out accuracy
- Use Ctrl+K for alternatives

### Compile & Test (3 min)
```bash
cobc -x PROGRAM.cbl -o program
./program       # or program.exe on Windows
```

---

## 🎯 Key Teaching Points

### COBOL Specific
✅ PIC clause and field definition  
✅ COMPUTE statements  
✅ EVALUATE for conditional logic  
✅ Paragraph structure  
✅ Working storage organization  

### Code Completions Work Best For
⭐ Calculation logic  
⭐ COMPUTE statements  
⭐ Conditional branches  
⭐ Repetitive field operations  
⭐ Standard data transformations  

---

## 📚 COBOL Syntax Quick Reference

### Field Definition (PIC Clause)
```cobol
77 FIELD-NAME PIC 9(6).        * Numeric, 6 digits
77 FIELD-NAME PIC 9(6)V99.     * Numeric with decimals
77 FIELD-NAME PIC X(30).       * Character, 30 bytes
```

### Common Statements
```cobol
COMPUTE RESULT = VALUE1 + VALUE2.
EVALUATE TRUE
    WHEN CONDITION1
        PERFORM PARAGRAPH1
    WHEN CONDITION2
        PERFORM PARAGRAPH2
END-EVALUATE.

IF CONDITION
    PERFORM PARAGRAPH
ELSE
    PERFORM OTHER-PARAGRAPH
END-IF.
```

---

## ✅ Pre-Demo Checklist

- [ ] GnuCOBOL installed
- [ ] Copilot connected
- [ ] COBOL extension installed (optional)
- [ ] Font size increased
- [ ] Dark theme enabled
- [ ] PROGRAM.cbl review done
- [ ] Terminal ready
- [ ] Compiler tested

---

## 🐛 Troubleshooting

### GnuCOBOL not found?
```bash
* Windows with MinGW:
cobc --version

* Linux:
sudo apt-get install gnucobol

* Mac:
brew install gnu-cobol
```

### Copilot not suggesting COBOL syntax?
- Wait 1-2 seconds longer (COBOL is less common)
- Provide more context (field definitions above)
- Check Copilot status bar
- Reload VS Code

### Compilation errors?
- Check line numbers in error message
- Verify PIC clauses are correct
- Ensure periods end sentences
- Check paragraph names

### Syntax highlighting issues?
- Install COBOL language extension
- Reload VS Code
- Check file extension (.cbl or .cob)

---

## 📖 Learning Resources

- GnuCOBOL Manual: https://gnucobol.sourceforge.io/
- COBOL Best Practices: Legacy code modernization
- OpenCOBOL Community: Active support

---

## 💡 Why COBOL Still Matters

COBOL handles:
- **Financial transactions** (86% of transactions)
- **Banking systems** (thousands of institutions)
- **Insurance processing** (large legacy systems)
- **Government systems** (tax, social security)
- **Retail POS** (point-of-sale systems)

Copilot helps COBOL developers:
- Modernize legacy code
- Improve readability
- Add new calculations
- Maintain existing systems
- Train junior developers

