import formatBytes from './formatBytes';

describe('formatBytes', () => {
  it('should format 0 bytes correctly', () => {
    expect(formatBytes(0)).toBe('0 B');
  });

  it('should format bytes to KB, MB, and GB correctly', () => {
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1048576)).toBe('1 MB');
    expect(formatBytes(1073741824)).toBe('1 GB');
  });

  it('should format with custom decimals', () => {
    expect(formatBytes(1500, 1)).toBe('1.5 KB');
    expect(formatBytes(1536, 0)).toBe('2 KB');
  });

  it('should handle negative or invalid inputs gracefully', () => {
    expect(formatBytes(-100)).toBe('0 B');
    // @ts-ignore
    expect(formatBytes(null)).toBe('0 B');
  });
});
