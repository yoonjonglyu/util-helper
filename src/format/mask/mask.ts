export interface CustomMaskOptions {
  start?: number;
  end?: number;
  maskChar?: string;
}

export type MaskOptions = 'email' | 'phone' | CustomMaskOptions;

/**
 * Masks sensitive information such as emails, phone numbers, or arbitrary strings.
 * @param value The string to mask.
 * @param options Preset ('email', 'phone') or custom mask options with start, end indices.
 */
function mask(value: string, options: MaskOptions = {}): string {
  if (typeof value !== 'string' || value.length === 0) return '';

  if (options === 'email') {
    const atIndex = value.indexOf('@');
    if (atIndex <= 1) return value;
    const name = value.slice(0, atIndex);
    const domain = value.slice(atIndex);
    const visibleLength = Math.min(2, Math.floor(name.length / 2));
    const maskedPart = '*'.repeat(Math.max(1, name.length - visibleLength));
    return `${name.slice(0, visibleLength)}${maskedPart}${domain}`;
  }

  if (options === 'phone') {
    // Matches 010-1234-5678 or 01012345678
    if (value.includes('-')) {
      const parts = value.split('-');
      if (parts.length === 3) {
        return `${parts[0]}-${'*'.repeat(parts[1].length)}-${parts[2]}`;
      }
    }
    if (value.length >= 10) {
      const prefix = value.slice(0, 3);
      const suffix = value.slice(-4);
      const middleLen = value.length - prefix.length - suffix.length;
      return `${prefix}${'*'.repeat(middleLen)}${suffix}`;
    }
  }

  const custom = typeof options === 'object' ? options : {};
  const { start = 0, end = value.length, maskChar = '*' } = custom;

  const validStart = Math.max(0, Math.min(start, value.length));
  const validEnd = Math.max(validStart, Math.min(end, value.length));

  const prefix = value.slice(0, validStart);
  const masked = maskChar.repeat(validEnd - validStart);
  const suffix = value.slice(validEnd);

  return `${prefix}${masked}${suffix}`;
}

export default mask;
