import isEmpty from './isEmpty';

describe('isEmpty', () => {
  it('should return true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should return true for empty string or whitespace-only string', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('   ')).toBe(true);
    expect(isEmpty('hello')).toBe(false);
  });

  it('should return true for empty array and object', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it('should return true for empty Map and Set', () => {
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);

    const map = new Map();
    map.set('a', 1);
    expect(isEmpty(map)).toBe(false);

    const set = new Set([1]);
    expect(isEmpty(set)).toBe(false);
  });

  it('should return false for numbers and booleans', () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(123)).toBe(false);
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty(true)).toBe(false);
  });
});
