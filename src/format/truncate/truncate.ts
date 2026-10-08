/**
 * Truncates a string to a specified maximum length, appending an ellipsis if needed.
 * @param str The string to truncate.
 * @param maxLength Maximum length including the ellipsis.
 * @param ellipsis The ellipsis string (default: '...').
 */
function truncate(
  str: string,
  maxLength: number,
  ellipsis: string = '...',
): string {
  if (typeof str !== 'string' || str.length === 0) return '';
  if (maxLength <= 0) return '';
  if (str.length <= maxLength) return str;

  const ellipsisLen = ellipsis.length;
  if (maxLength <= ellipsisLen) {
    return ellipsis.slice(0, maxLength);
  }

  return `${str.slice(0, maxLength - ellipsisLen)}${ellipsis}`;
}

export default truncate;
