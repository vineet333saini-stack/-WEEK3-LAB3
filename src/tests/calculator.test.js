const { calculate, parseNumbers, modulo, power, squareRoot } = require('../index');

describe('Calculator basic operations', () => {
  test('addition: add 1 2 3 => 6', () => {
    expect(calculate('add', [1, 2, 3])).toBe(6);
  });

  test('subtraction: subtract 10 4 1 => 5', () => {
    expect(calculate('subtract', [10, 4, 1])).toBe(5);
  });

  test('multiplication: multiply 2 3 4 => 24', () => {
    expect(calculate('multiply', [2, 3, 4])).toBe(24);
  });

  test('division: divide 20 5 => 4', () => {
    expect(calculate('divide', [20, 5])).toBe(4);
  });

  test('modulo: modulo 10 3 => 1', () => {
    expect(calculate('modulo', [10, 3])).toBe(1);
  });

  test('power: power 2 3 => 8', () => {
    expect(calculate('power', [2, 3])).toBe(8);
  });

  test('squareRoot: squareRoot 9 => 3', () => {
    expect(calculate('squareRoot', [9])).toBe(3);
  });
});

describe('Calculator edge cases and errors', () => {
  test('division by zero throws', () => {
    expect(() => calculate('divide', [10, 0])).toThrow(/Division by zero/);
  });

  test('modulo by zero throws', () => {
    expect(() => calculate('modulo', [10, 0])).toThrow(/Modulo by zero/);
  });

  test('unsupported operation throws', () => {
    expect(() => calculate('pow', [2, 3])).toThrow(/Unsupported operation/);
  });

  test('no numbers provided throws', () => {
    expect(() => calculate('add', [])).toThrow(/No numbers provided/);
  });

  test('parseNumbers invalid input throws', () => {
    expect(() => parseNumbers(['a'])).toThrow(/Invalid number/);
  });

  test('squareRoot of negative number throws', () => {
    expect(() => calculate('squareRoot', [-4])).toThrow(/Cannot take square root of negative number/);
  });

  test('power requires exactly 2 numbers', () => {
    expect(() => calculate('power', [2])).toThrow(/Power requires exactly 2 numbers/);
  });

  test('squareRoot requires exactly 1 number', () => {
    expect(() => calculate('squareRoot', [4, 2])).toThrow(/Square root requires exactly 1 number/);
  });
});

describe('Direct function tests', () => {
  test('modulo(17, 5) => 2', () => {
    expect(modulo(17, 5)).toBe(2);
  });

  test('power(3, 4) => 81', () => {
    expect(power(3, 4)).toBe(81);
  });

  test('squareRoot(16) => 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('modulo with zero divisor throws', () => {
    expect(() => modulo(10, 0)).toThrow(/Modulo by zero/);
  });

  test('squareRoot with negative throws', () => {
    expect(() => squareRoot(-9)).toThrow(/Cannot take square root of negative number/);
  });

  test('power with fractional exponent: power(4, 0.5) => 2', () => {
    expect(power(4, 0.5)).toBe(2);
  });
});
