import isMobile from './isMobile';

describe('isMobile', () => {
  it('should return true for Android user agent', () => {
    const userAgent = 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36';
    expect(isMobile(userAgent)).toBe(true);
  });

  it('should return true for iPhone user agent', () => {
    const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
    expect(isMobile(userAgent)).toBe(true);
  });

  it('should return false for desktop user agent', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    expect(isMobile(userAgent)).toBe(false);
  });

  it('should return true for iPad user agent', () => {
    const userAgent = 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
    expect(isMobile(userAgent)).toBe(true);
  });

  it('should return false for an empty user agent', () => {
    expect(isMobile('')).toBe(false);
  });

  it('should use the default navigator.userAgent if no argument is provided', () => {
    const originalNavigator = global.navigator;
    global.navigator = { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1' } as Navigator;

    expect(isMobile()).toBe(true);

    global.navigator = originalNavigator;
  });
});