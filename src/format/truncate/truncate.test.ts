import truncate from './truncate';

describe('truncate', () => {
  it('should not truncate if string length is within maxLength', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('should truncate string and append ellipsis when exceeding maxLength', () => {
    expect(truncate('Hello, world!', 8)).toBe('Hello...');
    expect(truncate('TypeScript is great', 10)).toBe('TypeScr...');
  });

  it('should support custom ellipsis', () => {
    expect(truncate('Hello, world!', 8, '..')).toBe('Hello,..');
  });

  it('should handle edge cases with short lengths or empty strings', () => {
    expect(truncate('', 5)).toBe('');
    expect(truncate('Hello', 0)).toBe('');
    expect(truncate('Hello', 2)).toBe('..');
  });
});
