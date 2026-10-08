/**
 * Validates whether a value is a valid HTTP or HTTPS URL.
 * @param value The value to test.
 * @returns True if valid URL string, false otherwise.
 */
function isUrl(value: any): boolean {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export default isUrl;
