/**
 * Validates whether a value is a valid email address.
 * @param value The value to test.
 * @returns True if valid email string, false otherwise.
 */
function isEmail(value: any): boolean {
  if (typeof value !== 'string') return false;
  // RFC 5322 compliant regex for practical frontend validation
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(value);
}

export default isEmail;
