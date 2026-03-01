#!/usr/bin/env node
/**
 * CLI Calculator
 *
 * Supported operations:
 * - add: addition (a + b + ...)
 * - subtract: subtraction (a - b - ...)
 * - multiply: multiplication (a * b * ...)
 * - divide: division (a / b / ...)
 */

function showUsage() {
  console.log('Usage: node src/index.js <operation> <num1> <num2> [num3 ...]');
  console.log('Operations: add, subtract, multiply, divide');
  console.log('Examples:');
  console.log('  node src/index.js add 1 2 3');
  console.log('  node src/index.js subtract 10 4 1');
}

function parseNumbers(args) {
  return args.map((s) => {
    const n = Number(s);
    if (Number.isNaN(n)) throw new Error(`Invalid number: ${s}`);
    return n;
  });
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
};
