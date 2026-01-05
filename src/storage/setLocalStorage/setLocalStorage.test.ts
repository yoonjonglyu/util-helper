/**
 * @jest-environment jsdom
 */
import setLocalStorage from './setLocalStorage';

describe('setLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set a string value in localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    setLocalStorage(key, value);

    expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
  });

  it('should set an object value in localStorage', () => {
    const key = 'testKey';
    const value = { name: 'John', age: 30 };

    setLocalStorage(key, value);

    expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
  });
  it('logs error when localStorage.setItem throws', () => {
    const spy = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('quota exceeded');
      });

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    setLocalStorage('test', 'value');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error setting localStorage item:',
      expect.any(Error),
    );

    spy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should handle circular references gracefully', () => {
    const key = 'testKey';
    const value: any = {};
    value.self = value; // Circular reference
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    setLocalStorage(key, value);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error setting localStorage item:',
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });
});
