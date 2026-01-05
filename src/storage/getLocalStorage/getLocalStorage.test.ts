/**
 * @jest-environment jsdom
 */
import getLocalStorage from './getLocalStorage';

describe('getLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns parsed value when key exists', () => {
    const key = 'testKey';
    const value = { data: 'testData' };

    localStorage.setItem(key, JSON.stringify(value));

    const result = getLocalStorage<typeof value>(key);

    expect(result).toEqual(value);
  });

  it('returns null when key does not exist', () => {
    expect(getLocalStorage('missing')).toBeNull();
  });

  it('returns null and logs error on JSON parse failure', () => {
    const key = 'bad';
    localStorage.setItem(key, 'invalid-json');

    const result = getLocalStorage(key);

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      `Error retrieving key "${key}" from localStorage:`,
      expect.any(SyntaxError),
    );
  });

  it('returns null and logs error when localStorage throws', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('localStorage error');
      });

    const result = getLocalStorage('test');

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      `Error retrieving key "test" from localStorage:`,
      expect.any(Error),
    );
  });
});
