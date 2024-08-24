/**
 * @jest-environment jsdom
 */

import getPlatform from './getPlatform';

describe('getPlatfrom', () => {
  Object.defineProperty(
    window.navigator,
    'userAgent',
    ((value) => ({
      get() {
        return value;
      },
      set(v) {
        value = v;
      },
    }))(window.navigator.userAgent),
  );
  test('Window Desktop Chrome', () => {
    //@ts-ignore
    window.navigator.userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';
    expect(getPlatform()?.os).toBe('Window');
    expect(getPlatform()?.mobile).toBeFalsy();
    expect(getPlatform()?.broswer).toBe('Google Chrome or Chromium');
  });
  test('Android Phone Samsung', () => {
    //@ts-ignore
    window.navigator.userAgent =
      'Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36';
    expect(getPlatform()?.os).toBe('Android');
    expect(getPlatform()?.mobile).toBeTruthy();
    expect(getPlatform()?.broswer).toBe('Samsung Internet');
  });
  test('IOS Iphone14pro Safari', () => {
    //@ts-ignore
    window.navigator.userAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1';
    expect(getPlatform()?.os).toBe('IOS');
    expect(getPlatform()?.mobile).toBeTruthy();
    expect(getPlatform()?.broswer).toBe('Apple Safari');
  });
});
