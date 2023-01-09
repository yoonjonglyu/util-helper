import isString from './isString';

describe('isString', () => {
  test('args type String', () => {
    expect(isString('')).toBeTruthy();
    expect(isString('asd')).toBeTruthy();
  });
  test('args type not string', () => {
    expect(isString(1)).toBeFalsy();
    expect(isString(null)).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
    expect(isString({})).toBeFalsy();
    expect(isString([])).toBeFalsy();
  });
});
