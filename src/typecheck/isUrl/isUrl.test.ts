import isUrl from './isUrl';

describe('isUrl', () => {
  it('should return true for valid http and https URLs', () => {
    expect(isUrl('https://example.com')).toBe(true);
    expect(isUrl('http://localhost:3000')).toBe(true);
    expect(isUrl('https://sub.domain.org/path?query=1#hash')).toBe(true);
  });

  it('should return false for invalid URLs or unsupported protocols', () => {
    expect(isUrl('ftp://example.com')).toBe(false);
    expect(isUrl('javascript:alert(1)')).toBe(false);
    expect(isUrl('just text')).toBe(false);
    expect(isUrl('/relative/path')).toBe(false);
  });

  it('should return false for non-string inputs', () => {
    expect(isUrl(null)).toBe(false);
    expect(isUrl(undefined)).toBe(false);
    expect(isUrl(12345)).toBe(false);
  });
});
