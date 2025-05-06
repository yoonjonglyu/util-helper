/**
 * @jest-environment jsdom
 */

import isDarkMode from './isDarkMode';

describe('isDarkMode', () => {
  beforeEach(() => {
    // Reset matchMedia mock before each test
    window.matchMedia = jest.fn();
  });

  it('should return true when prefers-color-scheme is dark', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));

    expect(isDarkMode()).toBe(true);
  });

  it('should return false when prefers-color-scheme is not dark', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: light)',
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));

    expect(isDarkMode()).toBe(false);
  });

  it('should return false if matchMedia is not supported', () => {
    window.matchMedia = undefined as any;

    expect(isDarkMode()).toBe(false);
  });
});