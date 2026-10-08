import isBrowser from '../../typecheck/isBrowser/isBrowser';

export interface CookieOptions {
  days?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

/**
 * Gets a cookie value by name.
 * @param name The name of the cookie.
 * @returns The decoded cookie value, or null if not found.
 */
export function getCookie(name: string): string | null {
  if (!isBrowser() || !name) return null;

  const encodedName = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(encodedName)) {
      return decodeURIComponent(cookie.substring(encodedName.length));
    }
  }

  return null;
}

/**
 * Sets a cookie with optional expiration, path, domain, secure flag, and sameSite policy.
 * @param name The name of the cookie.
 * @param value The value of the cookie.
 * @param options Cookie configuration options.
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
): void {
  if (!isBrowser() || !name) return;

  const { days, path = '/', domain, secure, sameSite = 'Lax' } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (typeof days === 'number') {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  if (path) {
    cookieString += `; path=${path}`;
  }

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += '; secure';
  }

  if (sameSite) {
    cookieString += `; samesite=${sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * Removes a cookie by expiring it immediately.
 * @param name The name of the cookie.
 * @param path The path of the cookie (defaults to '/').
 * @param domain The domain of the cookie.
 */
export function removeCookie(
  name: string,
  path: string = '/',
  domain?: string,
): void {
  setCookie(name, '', { days: -1, path, domain });
}

const cookie = Object.freeze({
  get: getCookie,
  set: setCookie,
  remove: removeCookie,
});

export default cookie;
