import isToday from './isToday';

describe('isToday', () => {
  it('should return true for today\'s date', () => {
    const today = new Date();
    expect(isToday(today)).toBe(true);
  });

  it('should return false for a date in the past', () => {
    const pastDate = new Date(2000, 0, 1); // January 1, 2000
    expect(isToday(pastDate)).toBe(false);
  });

  it('should return false for a date in the future', () => {
    const futureDate = new Date(3000, 0, 1); // January 1, 3000
    expect(isToday(futureDate)).toBe(false);
  });

  it('should return false for a date with the same day and month but different year', () => {
    const sameDayDifferentYear = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate());
    expect(isToday(sameDayDifferentYear)).toBe(false);
  });

  it('should return false for a date with the same year and month but different day', () => {
    const sameYearMonthDifferentDay = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    expect(isToday(sameYearMonthDifferentDay)).toBe(false);
  });

  it('should handle invalid dates gracefully', () => {
    const invalidDate = new Date('invalid-date');
    expect(isToday(invalidDate)).toBe(false);
  });
});