const { calculate, parseNumbers } = require('../index');

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
});

describe('Calculator edge cases and errors', () => {
  test('division by zero throws', () => {
    expect(() => calculate('divide', [10, 0])).toThrow(/Division by zero/);
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
});
