import isString from './isString';

describe('isString', () => {
  test('arg is String', () => {
    expect(isString('')).toBeTruthy();
    expect(isString('asd')).toBeTruthy();
  });
  test('arg not string', () => {
    expect(isString(1)).toBeFalsy();
    expect(isString(null)).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
    expect(isString({})).toBeFalsy();
    expect(isString([])).toBeFalsy();
  });
});
