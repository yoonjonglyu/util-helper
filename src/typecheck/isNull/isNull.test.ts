import isNull from './isNull';

describe('isNull', () => {
  it('returns true for null input', () => {
    expect(isNull(null)).toBeTruthy()
  });

  it('returns false for non-null input', () => {
    expect(isNull({})).toBeFalsy();
    expect(isNull([])).toBeFalsy();
    expect(isNull('')).toBeFalsy();
    expect(isNull(undefined)).toBeFalsy();
    expect(isNull(0)).toBeFalsy();
    expect(isNull(false)).toBeFalsy();
  });
});
