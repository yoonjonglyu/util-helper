import isEmail from './isEmail';

describe('isEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(isEmail('user@example.com')).toBe(true);
    expect(isEmail('user.name+tag@sub.example.co.kr')).toBe(true);
    expect(isEmail('123456@domain.io')).toBe(true);
  });

  it('should return false for invalid emails', () => {
    expect(isEmail('plainaddress')).toBe(false);
    expect(isEmail('@missingusername.com')).toBe(false);
    expect(isEmail('missing@domain')).toBe(false);
    expect(isEmail('username@.com')).toBe(false);
    expect(isEmail('username@domain..com')).toBe(false);
  });

  it('should return false for non-string inputs', () => {
    expect(isEmail(null)).toBe(false);
    expect(isEmail(undefined)).toBe(false);
    expect(isEmail(12345)).toBe(false);
    expect(isEmail({})).toBe(false);
  });
});
