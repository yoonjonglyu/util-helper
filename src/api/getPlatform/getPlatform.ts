import isUndefined from '../../typecheck/isUndefined/isUndefined';
import isMobile from '../../typecheck/isMobile/isMobile';
import isBrowser from '../../typecheck/isBrowser/isBrowser';

export interface PlatformProps {
  os: string;
  browser: string;
  mobile: boolean;
}

interface NavigatorUAData {
  platform: string;
  mobile: boolean;
}

const BROWSER_RULES: Array<{ name: string; match: (ua: string) => boolean }> = [
  { name: 'Mozilla Firefox', match: (ua) => ua.includes('Firefox') },
  { name: 'Samsung Internet', match: (ua) => ua.includes('SamsungBrowser') },
  { name: 'Opera', match: (ua) => ua.includes('Opera') || ua.includes('OPR') },
  { name: 'Microsoft Edge (Legacy)', match: (ua) => ua.includes('Edge') },
  { name: 'Microsoft Edge (Chromium)', match: (ua) => ua.includes('Edg') },
  { name: 'Google Chrome or Chromium', match: (ua) => ua.includes('Chrome') },
  { name: 'Apple Safari', match: (ua) => ua.includes('Safari') },
];

const OS_RULES: Array<{ name: string; match: (ua: string) => boolean }> = [
  { name: 'Android', match: (ua) => ua.includes('Android') },
  { name: 'iOS', match: (ua) => /like Mac OS X/i.test(ua) },
  { name: 'macOS', match: (ua) => ua.includes('Mac') },
  { name: 'Windows', match: (ua) => ua.includes('Windows') },
  { name: 'Linux', match: (ua) => ua.includes('Linux') },
];

function getBrowserName(userAgent: string): string {
  const found = BROWSER_RULES.find((rule) => rule.match(userAgent));
  return found ? found.name : 'unknown';
}

function getOsName(userAgent: string): string {
  const found = OS_RULES.find((rule) => rule.match(userAgent));
  return found ? found.name : 'unknown';
}

function getPlatform(): PlatformProps | null {
  if (!isBrowser()) return null;

  const nav = navigator as Navigator & { userAgentData?: NavigatorUAData };
  const platform: PlatformProps = {
    os: '',
    browser: '',
    mobile: false,
  };

  if (!isUndefined(nav.userAgentData)) {
    platform.browser = getBrowserName(nav.userAgent || '');
    platform.os = nav.userAgentData.platform;
    platform.mobile = nav.userAgentData.mobile;
    return platform;
  } else if (!isUndefined(nav.userAgent)) {
    platform.os = getOsName(nav.userAgent);
    platform.mobile = isMobile(nav.userAgent);
    platform.browser = getBrowserName(nav.userAgent);
    return platform;
  }

  return null;
}

export default getPlatform;
