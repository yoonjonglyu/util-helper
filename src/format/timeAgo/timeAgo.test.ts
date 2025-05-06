import timeAgo from './timeAgo';

describe('timeAgo', () => {
  it('should return "seconds ago" for dates less than a minute ago in English', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 30 * 1000); // 30 seconds ago
    expect(timeAgo(past, 'en')).toBe('30 seconds ago');
  });

  it('should return "minutes ago" for dates less than an hour ago in English', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
    expect(timeAgo(past, 'en')).toBe('5 minutes ago');
  });

  it('should return "hours ago" for dates less than a day ago in English', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 3 * 60 * 60 * 1000); // 3 hours ago
    expect(timeAgo(past, 'en')).toBe('3 hours ago');
  });

  it('should return "days ago" for dates less than a month ago in English', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
    expect(timeAgo(past, 'en')).toBe('10 days ago');
  });

  it('should return "months ago" for dates less than a year ago in English', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 5 * 30 * 24 * 60 * 60 * 1000); // 5 months ago
    expect(timeAgo(past, 'en')).toBe('5 months ago');
  });

  it('should return "years ago" for dates more than a year ago in English', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 2 * 12 * 30 * 24 * 60 * 60 * 1000); // 2 years ago
    expect(timeAgo(past, 'en')).toBe('2 years ago');
  });

  it('should return "초 전" for dates less than a minute ago in Korean', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 45 * 1000); // 45 seconds ago
    expect(timeAgo(past, 'ko')).toBe('45 초 전');
  });

  it('should return "분 전" for dates less than an hour ago in Korean', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 15 * 60 * 1000); // 15 minutes ago
    expect(timeAgo(past, 'ko')).toBe('15 분 전');
  });

  it('should return "시간 전" for dates less than a day ago in Korean', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 8 * 60 * 60 * 1000); // 8 hours ago
    expect(timeAgo(past, 'ko')).toBe('8 시간 전');
  });

  it('should return "일 전" for dates less than a month ago in Korean', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000); // 20 days ago
    expect(timeAgo(past, 'ko')).toBe('20 일 전');
  });

  it('should return "개월 전" for dates less than a year ago in Korean', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 7 * 30 * 24 * 60 * 60 * 1000); // 7 months ago
    expect(timeAgo(past, 'ko')).toBe('7 개월 전');
  });

  it('should return "년 전" for dates more than a year ago in Korean', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 3 * 12 * 30 * 24 * 60 * 60 * 1000); // 3 years ago
    expect(timeAgo(past, 'ko')).toBe('3 년 전');
  });
  it('should return "1 seconds ago" for 1 second ago in English', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 1 * 1000); // 1 second ago
    expect(timeAgo(past, 'en')).toBe('1 seconds ago');
  });
  it('should round up to "1 minute ago" for 90 seconds ago in English', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 90 * 1000); // 90 seconds ago
    expect(timeAgo(past, 'en')).toBe('1 minutes ago');
  });
  
  it('should round up to "1 분 전" for 90 seconds ago in Korean', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 90 * 1000); // 90 seconds ago
    expect(timeAgo(past, 'ko')).toBe('1 분 전');
  });
});
