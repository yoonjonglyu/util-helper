/**
 * @jest-environment jsdom
 */
import setLocalStorage from './setLocalStorage';

describe('setLocalStorage', () => {
  class LocalStorageMock implements Storage {
    private store: Record<string, string>;

    constructor() {
      this.store = {};
    }

    get length() {
      return Object.keys(this.store).length;
    }

    clear() {
      this.store = {};
    }

    getItem(key: string): string | null {
      return this.store[key] || null;
    }

    setItem(key: string, value: string): void {
      this.store[key] = String(value);
    }

    removeItem(key: string): void {
      delete this.store[key];
    }

    key(index: number): string | null {
      const keys = Object.keys(this.store);
      return keys[index] || null;
    }
  }

  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
    global.localStorage.clear();
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

  it('should handle errors when localStorage is not available', () => {
    const key = 'testKey';
    const value = 'testValue';
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    Object.defineProperty(window, 'localStorage', {
      value: null,
      writable: true,
    });

    setLocalStorage(key, value);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error setting localStorage item:',
      expect.any(Error),
    );

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
