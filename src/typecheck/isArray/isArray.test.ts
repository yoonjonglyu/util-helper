import isArray from './isArray';

describe('isArray', () => {
  test('arg is Array', () => {
    expect(isArray([])).toBeTruthy();
  });
  test('arg is not Array', () => {
    expect(isArray({})).toBeFalsy();
    expect(isArray(new Map())).toBeFalsy();
    expect(isArray(new Set())).toBeFalsy();
    expect(isArray('[]')).toBeFalsy();
  });
});
