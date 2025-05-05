import formatDate from './formatDate';

describe('formatDate', () => {
  test('should format date as YYYY-MM-DD', () => {
    const date = new Date(2023, 9, 5); // October 5, 2023
    const formatted = formatDate(date, 'YYYY-MM-DD');
    expect(formatted).toBe('2023-10-05');
  });

  test('should format date as MM/DD/YYYY', () => {
    const date = new Date(2023, 9, 5); // October 5, 2023
    const formatted = formatDate(date, 'MM/DD/YYYY');
    expect(formatted).toBe('10/05/2023');
  });

  test('should format date as HH:mm:ss', () => {
    const date = new Date(2023, 9, 5, 14, 30, 15); // October 5, 2023, 14:30:15
    const formatted = formatDate(date, 'HH:mm:ss');
    expect(formatted).toBe('14:30:15');
  });

  test('should format date as YYYY-MM-DD HH:mm:ss', () => {
    const date = new Date(2023, 9, 5, 14, 30, 15); // October 5, 2023, 14:30:15
    const formatted = formatDate(date, 'YYYY-MM-DD HH:mm:ss');
    expect(formatted).toBe('2023-10-05 14:30:15');
  });

  test('should handle single-digit months and days correctly', () => {
    const date = new Date(2023, 0, 1); // January 1, 2023
    const formatted = formatDate(date, 'YYYY-MM-DD');
    expect(formatted).toBe('2023-01-01');
  });

  test('should handle edge case of midnight', () => {
    const date = new Date(2023, 9, 5, 0, 0, 0); // October 5, 2023, 00:00:00
    const formatted = formatDate(date, 'HH:mm:ss');
    expect(formatted).toBe('00:00:00');
  });

  test('should return the format string unchanged if no tokens are present', () => {
    const date = new Date(2023, 9, 5);
    const formatted = formatDate(date, 'No tokens here');
    expect(formatted).toBe('No tokens here');
  });

  test('should format date with mixed tokens and text', () => {
    const date = new Date(2023, 9, 5, 14, 30, 15); // October 5, 2023, 14:30:15
    const formatted = formatDate(date, 'Today is YYYY/MM/DD at HH:mm:ss');
    expect(formatted).toBe('Today is 2023/10/05 at 14:30:15');
  });

  test('should handle invalid date object', () => {
    const date = new Date('invalid-date'); // Invalid date
    const formatted = formatDate(date, 'YYYY-MM-DD');
    expect(formatted).toBe('NaN-NaN-NaN');
  });

  test('should handle empty format string', () => {
    const date = new Date(2023, 9, 5);
    const formatted = formatDate(date, '');
    expect(formatted).toBe('');
  });

  test('should handle format string with repeated tokens', () => {
    const date = new Date(2023, 9, 5, 14, 30, 15); // October 5, 2023, 14:30:15
    const formatted = formatDate(date, 'YYYY-YYYY-MM-DD HH:mm:ss');
    expect(formatted).toBe('2023-2023-10-05 14:30:15');
  });

  test('should handle format string with unsupported tokens', () => {
    const date = new Date(2023, 9, 5);
    const formatted = formatDate(date, 'YYYY-MM-DD-XYZ');
    expect(formatted).toBe('2023-10-05-XYZ');
  });
});
