import isFunction from './isFunction';

describe('isFunction', () => {
  test('arg type is function', () => {
    expect(isFunction(() => {})).toBeTruthy();
    expect(isFunction(function () {})).toBeTruthy();
  });
  test('arg type is not function', () => {
    expect(isFunction('')).toBeFalsy();
    expect(isFunction({})).toBeFalsy();
    expect(isFunction([])).toBeFalsy();
    expect(isFunction(1)).toBeFalsy();
    expect(isFunction(1.2)).toBeFalsy();
    expect(isFunction(null)).toBeFalsy();
    expect(isFunction(undefined)).toBeFalsy();
  });
});
