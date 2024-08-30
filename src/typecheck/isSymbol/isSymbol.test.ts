import isSymbol from './isSymbol';

describe('isSymbol', () => {
  test('arg is  symbol', () => {
    expect(isSymbol(Symbol())).toBeTruthy();
  });

  test('arg not symbol', () => {
    expect(isSymbol('symbol')).toBeFalsy();
    expect(isSymbol(123)).toBeFalsy();
    expect(isSymbol({})).toBeFalsy();
  });
});
