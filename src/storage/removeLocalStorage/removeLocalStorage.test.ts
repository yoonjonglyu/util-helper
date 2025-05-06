import removeLocalStorage from './removeLocalStorage';

describe('removeLocalStorage', () => {
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
    localStorage.clear();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should remove an item from localStorage when a valid key is provided', () => {
    localStorage.setItem('testKey', 'testValue');
    expect(localStorage.getItem('testKey')).toBe('testValue');

    removeLocalStorage('testKey');

    expect(localStorage.getItem('testKey')).toBeNull();
    expect(console.log).toHaveBeenCalledWith(
      'Item with key "testKey" removed from localStorage.',
    );
  });

  it('should warn if no key is provided', () => {
    removeLocalStorage('');

    expect(console.warn).toHaveBeenCalledWith(
      'Key is required to remove an item from localStorage.',
    );
  });

  it('should handle errors when localStorage.removeItem throws an error', () => {
    jest.spyOn(localStorage, 'removeItem').mockImplementation(() => {
      throw new Error('Mock error');
    });

    removeLocalStorage('testKey');

    expect(console.error).toHaveBeenCalledWith(
      'Failed to remove item with key "testKey" from localStorage:',
      expect.any(Error),
    );
  });
});