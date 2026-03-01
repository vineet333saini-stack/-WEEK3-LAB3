#!/usr/bin/env node
/**
 * CLI Calculator
 *
 * Supported operations:
 * - add: addition (a + b + ...)
 * - subtract: subtraction (a - b - ...)
 * - multiply: multiplication (a * b * ...)
 * - divide: division (a / b / ...)
 * - modulo: remainder of division (a % b)
 * - power: exponentiation (base ^ exponent)
 * - squareRoot: square root of n
 */

function showUsage() {
  console.log('Usage: node src/index.js <operation> <num1> <num2> [num3 ...]');
  console.log('Operations: add, subtract, multiply, divide, modulo, power, squareRoot');
  console.log('Examples:');
  console.log('  node src/index.js add 1 2 3');
  console.log('  node src/index.js subtract 10 4 1');
  console.log('  node src/index.js modulo 10 3');
  console.log('  node src/index.js power 2 3');
  console.log('  node src/index.js squareRoot 9');
}

function parseNumbers(args) {
  return args.map((s) => {
    const n = Number(s);
    if (Number.isNaN(n)) throw new Error(`Invalid number: ${s}`);
    return n;
  });
}

/**
 * Modulo operation: returns the remainder of a divided by b
 */
function modulo(a, b) {
  if (b === 0) throw new Error('Modulo by zero');
  return a % b;
}

/**
 * Power operation: returns base raised to the exponent
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Square root operation: returns the square root of n
 */
function squareRoot(n) {
  if (n < 0) throw new Error('Cannot take square root of negative number');
  return Math.sqrt(n);
}

function calculate(op, numbers) {
  if (numbers.length === 0) throw new Error('No numbers provided');

  switch (op) {
    case 'add':
      return numbers.reduce((a, b) => a + b, 0);
    case 'subtract':
      return numbers.slice(1).reduce((a, b) => a - b, numbers[0]);
    case 'multiply':
      return numbers.reduce((a, b) => a * b, 1);
    case 'divide':
      return numbers.slice(1).reduce((a, b) => {
        if (b === 0) throw new Error('Division by zero');
        return a / b;
      }, numbers[0]);
    case 'modulo':
      if (numbers.length < 2) throw new Error('Modulo requires at least 2 numbers');
      return numbers.slice(1).reduce((a, b) => modulo(a, b), numbers[0]);
    case 'power':
      if (numbers.length !== 2) throw new Error('Power requires exactly 2 numbers');
      return power(numbers[0], numbers[1]);
    case 'squareRoot':
      if (numbers.length !== 1) throw new Error('Square root requires exactly 1 number');
      return squareRoot(numbers[0]);
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

function main() {
  const [, , op, ...args] = process.argv;
  if (!op) {
    showUsage();
    process.exit(1);
  }

  try {
    const numbers = parseNumbers(args);
    const result = calculate(op, numbers);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    showUsage();
    process.exit(1);
  }
}

if (require.main === module) main();

// Export functions for unit testing
module.exports = {
  calculate,
  parseNumbers,
  modulo,
  power,
  squareRoot,
};
