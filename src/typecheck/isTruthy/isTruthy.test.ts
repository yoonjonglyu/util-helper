import isTruthy from './isTruthy';

describe('isTruthy', () => {
  test('arg is Truthy', () => {
    expect(isTruthy(1)).toBeTruthy();
    expect(isTruthy('1test')).toBeTruthy();
    expect(isTruthy({})).toBeTruthy();
    expect(isTruthy(() => {})).toBeTruthy();

  });
  test('arg not Truthy', () => {
    expect(isTruthy(undefined)).toBeFalsy();
    expect(isTruthy(null)).toBeFalsy();
    expect(isTruthy(0)).toBeFalsy();
    expect(isTruthy('')).toBeFalsy();
  });
});
