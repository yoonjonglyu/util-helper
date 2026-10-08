/**
 * @jest-environment jsdom
 */

import { getCookie, setCookie, removeCookie } from './cookie';

describe('cookie utils', () => {
  beforeEach(() => {
    // Clear cookies before each test
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
  });

  it('should set and get a cookie value correctly', () => {
    setCookie('username', 'john_doe');
    expect(getCookie('username')).toBe('john_doe');
  });

  it('should return null for non-existent cookie', () => {
    expect(getCookie('non_existent')).toBeNull();
  });

  it('should handle special characters with URL encoding', () => {
    setCookie('token', 'abc 123!@#');
    expect(getCookie('token')).toBe('abc 123!@#');
  });

  it('should remove a cookie by expiring it', () => {
    setCookie('to_delete', 'value');
    expect(getCookie('to_delete')).toBe('value');

    removeCookie('to_delete');
    // In jsdom document.cookie, setting expired cookie is simulated
    expect(getCookie('to_delete')).toBe('');
  });
});
