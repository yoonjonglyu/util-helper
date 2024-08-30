import isUndefined from './isUndefined';

describe('isUndefined', () => {
  test('arg is undefined', () => {
    expect(isUndefined(undefined)).toBeTruthy();
    // @ts-ignore
    expect(isUndefined()).toBeTruthy();
  });
  test('arg not undefined', () => {
    expect(isUndefined('symbol')).toBeFalsy();
    expect(isUndefined(123)).toBeFalsy();
    expect(isUndefined({})).toBeFalsy();
    expect(isUndefined(null)).toBeFalsy();
    expect(isUndefined(0)).toBeFalsy();
    expect(isUndefined('')).toBeFalsy();
  });
});
