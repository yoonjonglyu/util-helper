import isNumber from "./isNumber";

describe('isNumber', () => {
  test('args type number', () => {
    expect(isNumber(1)).toBeTruthy();
    expect(isNumber(1.2)).toBeTruthy();
    expect(isNumber(1234)).toBeTruthy();
  });
  test('args type not number', () => {
    expect(isNumber('1')).toBeFalsy();
    expect(isNumber(undefined)).toBeFalsy();
    expect(isNumber(null)).toBeFalsy();
    expect(isNumber({})).toBeFalsy();
    expect(isNumber([])).toBeFalsy();
  });
});
