import isSymbol from './isSymbol';

describe('isSymbol', () => {
  test('should return true if argument is a symbol', () => {
    expect(isSymbol(Symbol())).toBe(true);
  });

  test('should return false if argument is not a symbol', () => {
    expect(isSymbol('symbol')).toBe(false);
    expect(isSymbol(123)).toBe(false);
    expect(isSymbol({})).toBe(false);
  });
});
