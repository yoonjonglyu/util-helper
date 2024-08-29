// @ts-nocheck
import isUndefined from '../../typecheck/isUndefined/isUndefined';

export interface PlatformProps {
  os: ReturnType<typeof getOsName>;
  broswer: ReturnType<typeof getBrowserName>;
  mobile: boolean;
}
/**
 * @todo 브라우저 호환성 이슈 및 표준 이슈로 추후 userAgent와 userAgentData의 규격에 따라 수정해야됨
 */
function getPlatform(): PlatformProps | null {
  const platfrom: PlatformProps = {
    os: '',
    broswer: '',
    mobile: false,
  };
  if (!isUndefined(navigator.userAgentData)) {
    platfrom.broswer = getBrowserName(navigator.userAgent);
    platfrom.os = navigator.userAgentData.platform;
    platfrom.mobile = navigator.userAgentData.mobile;
    return platfrom;
  } else if (!isUndefined(navigator.userAgent)) {
    platfrom.os = getOsName(navigator.userAgent);
    platfrom.mobile = checkMobile(navigator.userAgent);
    platfrom.broswer = getBrowserName(navigator.userAgent);
    return platfrom;
  }

  return null;
}

export default getPlatform;

function getBrowserName(userAgent: string) {
  if (userAgent.includes('Firefox')) {
    // "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"
    return 'Mozilla Firefox';
  } else if (userAgent.includes('SamsungBrowser')) {
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36"
    return 'Samsung Internet';
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 OPR/90.0.4480.54"
    return 'Opera';
  } else if (userAgent.includes('Edge')) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    return 'Microsoft Edge (Legacy)';
  } else if (userAgent.includes('Edg')) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70"
    return 'Microsoft Edge (Chromium)';
  } else if (userAgent.includes('Chrome')) {
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    return 'Google Chrome or Chromium';
  } else if (userAgent.includes('Safari')) {
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1"
    return 'Apple Safari';
  } else {
    return 'unknown';
  }
}
function getOsName(userAgent: string) {
  if (userAgent.includes('Android')) {
    return 'Android';
  } else if (userAgent.match(/like Mac OS X/i)) {
    return 'iOS';
  } else if (userAgent.includes('Mac')) {
    return 'macOS';
  } else if (userAgent.includes('Windows')) {
    return 'Windows';
  } else if (userAgent.includes('Linux')) {
    return 'Linux';
  } else return 'unknown';
}
function checkMobile(userAgent: string) {
  return userAgent.match(/Android|iPhone/i);
}
