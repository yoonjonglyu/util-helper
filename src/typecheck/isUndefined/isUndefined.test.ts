import isUndefined from './isUndefined';

describe('isUndefined', () => {
  test('arg is undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });
  test('arg not undefined', () => {
    expect(isUndefined('symbol')).toBe(false);
    expect(isUndefined(123)).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined(null)).toBe(false);
  });
});
