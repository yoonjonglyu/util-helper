import isObject from './isObject';

describe('isObject', () => {
  test('arg is  object', () => {
    expect(isObject({ key: 'value' })).toBeTruthy();
    expect(isObject({})).toBeTruthy();
    expect(isObject(new Object())).toBeTruthy();
    expect(isObject(Object.create(null))).toBeTruthy();
  });

  test(' arg not object', () => {
    expect(isObject([1, 2, 3])).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
    expect(isObject('{}')).toBeFalsy();
    expect(isObject(() => {})).toBeFalsy();
    expect(isObject('2')).toBeFalsy();
    expect(isObject('{"key": 1}')).toBeFalsy();
    expect(isObject(undefined)).toBeFalsy();
  });
});
