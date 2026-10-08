/**
 * @jest-environment jsdom
 */

import {
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
} from './sessionStorage';

describe('sessionStorage utils', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should store and retrieve objects correctly', () => {
    const data = { user: 'Alice', role: 'admin' };
    setSessionStorage('session_user', data);

    const retrieved = getSessionStorage<typeof data>('session_user');
    expect(retrieved).toEqual(data);
  });

  it('should return null when key does not exist', () => {
    expect(getSessionStorage('non_existent')).toBeNull();
  });

  it('should remove item properly', () => {
    setSessionStorage('temp', '12345');
    expect(getSessionStorage('temp')).toBe('12345');

    removeSessionStorage('temp');
    expect(getSessionStorage('temp')).toBeNull();
  });
});
