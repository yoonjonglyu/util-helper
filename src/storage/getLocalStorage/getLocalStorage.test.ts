import getLocalStorage from './getLocalStorage';

describe('getLocalStorage', () => {
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
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the parsed value when the key exists in localStorage', () => {
    const key = 'testKey';
    const value = { data: 'testData' };
    localStorage.setItem(key, JSON.stringify(value));

    const result = getLocalStorage<typeof value>(key);

    expect(result).toEqual(value);
  });

  it('should return null when the key does not exist in localStorage', () => {
    const key = 'nonExistentKey';

    const result = getLocalStorage<any>(key);

    expect(result).toBeNull();
  });

  it('should return null and log an error when JSON parsing fails', () => {
    const key = 'invalidJsonKey';
    localStorage.setItem(key, 'invalid-json');

    const result = getLocalStorage<any>(key);

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      `Error retrieving key "${key}" from localStorage:`,
      expect.any(SyntaxError),
    );
  });

  it('should return null and log an error when localStorage throws an error', () => {
    const key = 'testKey';
    jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('localStorage error');
    });

    const result = getLocalStorage<any>(key);

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      `Error retrieving key "${key}" from localStorage:`,
      expect.any(Error),
    );
  });
});
