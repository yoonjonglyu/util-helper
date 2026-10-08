import mask from './mask';

describe('mask', () => {
  it('should mask email addresses properly', () => {
    expect(mask('john.doe@example.com', 'email')).toBe('jo******@example.com');
    expect(mask('a@b.com', 'email')).toBe('a@b.com');
  });

  it('should mask phone numbers properly', () => {
    expect(mask('010-1234-5678', 'phone')).toBe('010-****-5678');
    expect(mask('01012345678', 'phone')).toBe('010****5678');
  });

  it('should mask with custom range and mask character', () => {
    expect(mask('1234567890', { start: 3, end: 7 })).toBe('123****890');
    expect(mask('abcdef', { start: 2, end: 5, maskChar: '#' })).toBe('ab###f');
  });

  it('should handle empty or invalid values gracefully', () => {
    expect(mask('')).toBe('');
    // @ts-ignore
    expect(mask(null)).toBe('');
  });
});
