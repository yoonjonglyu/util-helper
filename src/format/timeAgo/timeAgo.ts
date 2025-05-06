import isUndefined from "../../typecheck/isUndefined/isUndefined";

const translations = {
  en: {
    seconds: 'seconds ago',
    minutes: 'minutes ago',
    hours: 'hours ago',
    days: 'days ago',
    months: 'months ago',
    years: 'years ago',
  },
  ko: {
    seconds: '초 전',
    minutes: '분 전',
    hours: '시간 전',
    days: '일 전',
    months: '개월 전',
    years: '년 전',
  },
};

type Locale = keyof typeof translations;

function timeAgo(date: Date | string | number, locale: Locale = 'en'): string {
  const now = new Date();

  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const t = isUndefined(translations[locale])
    ? translations.en
    : translations[locale];

  if (diffInSeconds < 60) {
    return `${diffInSeconds} ${t.seconds}`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${t.minutes}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${t.hours}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${t.days}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${t.months}`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${t.years}`;
}

export default timeAgo;