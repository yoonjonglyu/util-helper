import isObject from './isObject';

describe('isObject', () => {
  test('returns true if argument is an object', () => {
    const myObject = { key: 'value' };
    const result = isObject(myObject);
    expect(result).toBe(true);
  });

  test('returns false if argument is not an object', () => {
    const myArray = [1, 2, 3];
    const result = isObject(myArray);
    expect(result).toBe(false);
  });
});
