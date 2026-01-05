import isBrowser from './isBrowser';

describe('isBrowser', () => {

  it('should return false in Node environment', () => {
    expect(isBrowser()).toBe(false);
  });
});