/*
    STEP 3 — Build the Calculator class (Code mode)
    =================================================
    Use CODE MODE in Bob with this prompt:
    "Create script.js with a Calculator class using literate coding.
     Methods: clear(), delete(), appendNumber(number),
     chooseOperation(operation), compute(), percentage(),
     getDisplayNumber(number), updateDisplay().
     Explain why shouldResetScreen is needed, why Number.EPSILON
     is used, and why e.preventDefault() is needed on Enter."

    State the class needs:
      this.currentOperand    — number currently on screen
      this.previousOperand   — first operand (stored after operator pressed)
      this.operation         — '+' '-' '*' '/'
      this.shouldResetScreen — true after compute() so next digit starts fresh


    STEP 4 — Understand edge cases (Ask mode, then Code mode)
    ==========================================================
    FIRST switch to ASK MODE and ask Bob:
    "Explain: 1) Why does 0.1+0.2 give floating point errors in JS?
               2) How does Number.EPSILON fix it?
               3) What other edge cases does a calculator need?"

    THEN switch back to CODE MODE and ask Bob to apply the fixes:
    - Number.EPSILON rounding in compute()
    - Block multiple decimal points in appendNumber()
    - Divide by zero guard with alert + clear()
    - toLocaleString number formatting in getDisplayNumber()
*/

/* Your code goes here */
