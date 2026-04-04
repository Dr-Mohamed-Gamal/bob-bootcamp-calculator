# Lab Guide — Build a Calculator App with Bob

**Duration:** 45 minutes | **Difficulty:** Beginner to Intermediate

---

## What you'll build

A fully functional dark-theme calculator with:
- HTML structure using semantic data-* attributes
- CSS Grid 4-column button layout
- JavaScript Calculator class with full state management
- Keyboard support
- Edge case handling (divide by zero, floating-point precision)
- GitHub repository via Bob's Advanced mode + MCP

---

## Lab timeline

```
Lab timeline (45 min)
├── Lab 01: Plan the structure      — Plan mode    (5 min)
├── Lab 02: Build HTML & CSS        — Code mode    (10 min)
├── Lab 03: Build Calculator class  — Code mode    (10 min)
├── Lab 04: Understand edge cases   — Ask mode     (10 min)
└── Lab 05: Push to GitHub          — Advanced mode (10 min)
```

---

## Lab 01 — Plan the structure (Plan mode, 5 min)

**Switch Bob to Plan mode.**

Before writing any code, ask Bob to design the project. Bob will ask
clarifying questions — this is intentional. Answer with: simple layout,
vanilla JS, no frameworks, keyboard support yes, no history log.

**Prompt for Bob:**
```
I want to build a calculator app with HTML, CSS, and vanilla JavaScript.
Help me plan:
1. The file structure
2. The HTML layout using CSS Grid
3. What state the Calculator class needs to track
4. What methods the class should have
Ask me clarifying questions first.
```

**Expected output from Bob:**
- Three files: index.html, styles.css, script.js
- 4-column CSS Grid button layout
- Calculator class with: currentOperand, previousOperand, operation, shouldResetScreen
- Methods: clear, delete, appendNumber, chooseOperation, compute, updateDisplay

> **Bob differentiator:** Plan mode asks clarifying questions before planning.
> It lets you drive the process — Bob adapts to your requirements, not the other way around.

---

## Lab 02 — Build HTML & CSS (Code mode, 10 min)

**Switch Bob to Code mode.**

Enable auto-approvals so Bob creates both files without confirmation dialogs.

**Prompt for Bob:**
```
Create index.html and styles.css for a dark-theme calculator.
Requirements:
- 4-column CSS Grid for the button layout
- data-number, data-operator, data-action attributes on every button
- .btn-equals spans 2 columns (=)
- .btn-zero spans 2 columns (0), text left-aligned
- Orange (#ff9500) for operator and equals buttons
- Gray (#505050) for function buttons (AC, DEL, %)
- Dark theme: #1e1e1e card, #2d2d2d display, gradient background
Use the 1px gap + dark background trick for button dividers.
Enable auto-approvals.
```

**Key CSS trick:**
```css
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: #111; /* gap + dark bg = divider lines, no real borders needed */
}
```

> **Bob differentiator:** In Code mode, Bob creates actual files in your project —
> not just snippets to copy-paste. Auto-approvals let it generate multiple files rapidly.

---

## Lab 03 — Build the Calculator class (Code mode, 10 min)

**Stay in Code mode.**

Ask Bob to use literate coding — comments that explain *why*, not just *what*.

**Prompt for Bob:**
```
Create script.js with a Calculator class using literate coding.
Methods needed: clear(), delete(), appendNumber(number),
chooseOperation(operation), compute(), percentage(),
getDisplayNumber(number), updateDisplay().

Use detailed comments explaining:
- Why shouldResetScreen is needed after compute()
- Why Number.EPSILON is used in rounding
- How data-* attribute selectors replace individual IDs
- Why e.preventDefault() is needed on the Enter key
```

**The shouldResetScreen flag** (most common bug):
```javascript
compute() {
    // ... calculate result ...
    this.shouldResetScreen = true;
    // Without this, pressing "5" after "3+2=" gives "35" not "5"
}
```

> **Bob differentiator:** Literate coding makes your codebase self-documenting.
> Great for onboarding teammates and for your own future reference.

---

## Lab 04 — Understand edge cases (Ask mode, 10 min)

**Switch Bob to Ask mode.**

Ask mode explains without touching your files. Understand the bugs first,
then switch back to Code mode to fix them.

**Prompt for Bob:**
```
Explain three things:
1. Why does 0.1 + 0.2 give 0.30000000000000004 in JavaScript?
2. How does Math.round with Number.EPSILON fix it?
3. What other edge cases does a calculator need to handle and why?
```

**Then switch back to Code mode and ask:**
```
Apply these fixes to script.js:
- Number.EPSILON rounding in compute()
- Block multiple decimal points in appendNumber()
- Divide by zero guard with alert and clear()
- toLocaleString formatting in getDisplayNumber()
```

**The fix:**
```javascript
roundResult(number) {
    // Eliminates float noise: 0.1+0.2 → 0.3 not 0.30000000000000004
    return Math.round((number + Number.EPSILON) * 100000000) / 100000000;
}
```

> **Bob differentiator:** Ask mode is intentionally read-only — it encourages
> understanding before fixing. You'll write better code when you know why bugs happen.

---

## Lab 05 — Push to GitHub (Advanced mode, 10 min)

**Switch Bob to Advanced mode.**

Advanced mode unlocks MCP server access. The GitHub MCP server lets Bob
create repositories, commit, and push — all through natural language.

**Prompt for Bob:**
```
Use the GitHub MCP server to:
1. Initialize a git repository in the current directory
2. Create a .gitignore file for HTML/CSS/JS projects
3. Commit all files with message "Initial calculator implementation"
4. Create a new GitHub repository called "bob-calculator-app"
5. Push the code and give me the repository URL
```

**What Bob does behind the scenes:**
```
"Initialize a git repo"     → git init
"Create .gitignore"         → writes .gitignore file
"Commit all files"          → git add . && git commit -m "..."
"Create GitHub repo"        → GitHub API creates repository
"Push the code"             → git push origin main
```

> **Bob differentiator:** Advanced mode is the only mode with MCP server access.
> It includes all Code mode capabilities plus integration with external tools like
> GitHub, JIRA, databases, and any internal APIs your team exposes via MCP.

---

## Congratulations!

You've used all four Bob modes to build and ship a complete calculator app.

### What you practised

| Bob mode | Used for |
|----------|----------|
| Plan     | Architecture and design decisions before coding |
| Code     | Generating files with auto-approvals and literate coding |
| Ask      | Understanding bugs before fixing them |
| Advanced | GitHub integration via MCP server |

### Next steps
- Add a calculation history log (use Plan mode to design, Code mode to build)
- Implement a scientific mode with sin, cos, sqrt
- Add dark/light theme toggle
- Try Lab 2: Security Analysis →

---

*Bob Bootcamp — MEA Watsonx Bootcamp — IBM Client Engineering*
