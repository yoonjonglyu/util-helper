import isNull from './isNull';

describe('isNull', () => {
  it('returns true for null input', () => {
    expect(isNull(null)).toBe(true);
  });

  it('returns false for non-null input', () => {
    expect(isNull({})).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(undefined)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull(false)).toBe(false);
  });
});
