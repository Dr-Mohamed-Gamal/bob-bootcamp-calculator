/**
 * Calculator Application — script.js
 * ====================================
 * Built during Bob Bootcamp Lab 1, Steps 3 & 4.
 *
 * Demonstrates:
 *  - OOP with ES6 classes
 *  - State management without global variables
 *  - Event delegation via data-* attribute selectors
 *  - Floating-point precision handling with Number.EPSILON
 *  - Full keyboard support
 *  - Literate coding (comments explain WHY, not just what)
 */

class Calculator {

    /**
     * The constructor receives two DOM elements — the display areas.
     * All state lives inside the instance; no globals needed.
     */
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement  = currentOperandElement;
        this.clear();
    }

    /** Reset everything — triggered by AC button or Escape key */
    clear() {
        this.currentOperand    = '0';
        this.previousOperand   = '';
        this.operation         = undefined;
        /**
         * shouldResetScreen: when true, the next digit press clears the
         * display and starts a fresh number instead of appending to the result.
         * Without this flag, pressing "5" after "3+2=" gives "35" not "5".
         */
        this.shouldResetScreen = false;
    }

    /** Remove the last digit, or reset to '0' if only one character left */
    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.length === 1
            ? '0'
            : this.currentOperand.slice(0, -1);
    }

    /**
     * Append a digit or decimal point to currentOperand.
     *
     * Guards applied here:
     *  1. If shouldResetScreen is true, start fresh (post-computation press)
     *  2. Block multiple decimals — "3.1.4" is invalid
     *  3. Replace a lone "0" with the digit, unless it's a decimal point
     */
    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand    = '0';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = (this.currentOperand === '0' && number !== '.')
            ? number
            : this.currentOperand + number;
    }

    /**
     * Record the chosen operator (+, -, *, /).
     * If an operator was already active, compute first — this enables
     * chained operations like 5 + 3 × 2 without pressing = in between.
     */
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') this.compute();
        this.operation       = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand  = '0';
    }

    /**
     * Perform the arithmetic and update state.
     *
     * Floating-point fix: JavaScript's IEEE 754 arithmetic produces
     * results like 0.1 + 0.2 = 0.30000000000000004. We fix this by
     * rounding to 8 decimal places using Number.EPSILON — the smallest
     * representable float difference. Adding EPSILON before rounding
     * nudges ambiguous midpoint values in the correct direction.
     */
    compute() {
        const prev    = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        // Guard: both operands must be valid numbers
        if (isNaN(prev) || isNaN(current)) return;

        let result;
        switch (this.operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/':
                // Guard: division by zero is mathematically undefined
                if (current === 0) {
                    alert('Cannot divide by zero');
                    this.clear();
                    this.updateDisplay();
                    return;
                }
                result = prev / current;
                break;
            default: return;
        }

        this.currentOperand    = this.roundResult(result).toString();
        this.operation         = undefined;
        this.previousOperand   = '';
        this.shouldResetScreen = true; // next keypress starts a new number
    }

    /**
     * Eliminate floating-point noise by rounding to 8 decimal places.
     * Math.round((n + Number.EPSILON) * 1e8) / 1e8
     */
    roundResult(number) {
        return Math.round((number + Number.EPSILON) * 100000000) / 100000000;
    }

    /** Convert the current number to a percentage (e.g. 75 → 0.75) */
    percentage() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand    = (current / 100).toString();
        this.shouldResetScreen = true;
    }

    /**
     * Format a number for display:
     * - Integer part gets locale-aware comma separators (1000000 → 1,000,000)
     * - Decimal part is preserved as-is (no rounding mid-input)
     */
    getDisplayNumber(number) {
        const str         = number.toString();
        const integerPart = parseFloat(str.split('.')[0]);
        const decimalPart = str.split('.')[1];
        const intDisplay  = isNaN(integerPart)
            ? ''
            : integerPart.toLocaleString('en', { maximumFractionDigits: 0 });
        return decimalPart != null
            ? `${intDisplay}.${decimalPart}`
            : intDisplay;
    }

    /** Sync both display elements with current state */
    updateDisplay() {
        this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            const symbol = { '+': '+', '-': '−', '*': '×', '/': '÷' }[this.operation];
            this.previousOperandElement.textContent =
                `${this.getDisplayNumber(this.previousOperand)} ${symbol}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }
}

// ── Initialise ────────────────────────────────────────────────────────────────

const calculator = new Calculator(
    document.getElementById('previous-operand'),
    document.getElementById('current-operand')
);

// ── Event wiring via data-* selectors ─────────────────────────────────────────
// Using data-* attributes decouples HTML structure from JS logic.
// querySelectorAll('[data-number]') selects ALL number buttons at once —
// no individual IDs needed, no fragile coupling to position or class names.

document.querySelectorAll('[data-number]').forEach(btn =>
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.dataset.number);
        calculator.updateDisplay();
    })
);

document.querySelectorAll('[data-operator]').forEach(btn =>
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.dataset.operator);
        calculator.updateDisplay();
    })
);

document.querySelectorAll('[data-action]').forEach(btn =>
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action === 'clear')   calculator.clear();
        if (action === 'delete')  calculator.delete();
        if (action === 'equals')  calculator.compute();
        if (action === 'percent') calculator.percentage();
        calculator.updateDisplay();
    })
);

// ── Keyboard support ──────────────────────────────────────────────────────────

document.addEventListener('keydown', e => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }
    if (['+', '-', '*', '/'].includes(e.key)) {
        calculator.chooseOperation(e.key);
        calculator.updateDisplay();
    }
    if (e.key === 'Enter' || e.key === '=') {
        /**
         * e.preventDefault() stops the browser's default Enter behaviour —
         * which can scroll the page or submit a form, neither of which we want.
         */
        e.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }
    if (e.key === 'Escape')    { calculator.clear();      calculator.updateDisplay(); }
    if (e.key === 'Backspace') { calculator.delete();     calculator.updateDisplay(); }
    if (e.key === '%')         { calculator.percentage(); calculator.updateDisplay(); }
});

// ── Initial render ────────────────────────────────────────────────────────────
calculator.updateDisplay();
