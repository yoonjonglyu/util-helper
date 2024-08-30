import isFalsy from './isFalsy';

describe('isFalsy', () => {
  test('arg is Falsy', () => {
    expect(isFalsy(undefined)).toBeTruthy();
    expect(isFalsy(null)).toBeTruthy();
    expect(isFalsy(0)).toBeTruthy();
    expect(isFalsy('')).toBeTruthy();
    expect(isFalsy(NaN)).toBeTruthy();
    expect(isFalsy(false)).toBeTruthy();
  });
  test('arg not Falsy', () => {
    expect(isFalsy(1)).toBeFalsy();
    expect(isFalsy('1test')).toBeFalsy();
    expect(isFalsy({})).toBeFalsy();
    expect(isFalsy(() => {})).toBeFalsy();
    expect(isFalsy([])).toBeFalsy();
    expect(isFalsy(true)).toBeFalsy();
  });
});
