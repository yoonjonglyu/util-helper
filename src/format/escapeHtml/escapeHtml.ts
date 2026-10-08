const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const HTML_UNESCAPES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x27;': "'",
};

/**
 * Escapes characters &, <, >, ", and ' in string to their corresponding HTML entities.
 *
 * @param str The string to escape.
 * @returns The escaped HTML string.
 */
export const escapeHtml = (str: string = ''): string => {
  if (typeof str !== 'string' || !str) {
    return '';
  }

  return str.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] || char);
};

/**
 * Converts the HTML entities &amp;, &lt;, &gt;, &quot;, and &#39; in string to their corresponding characters.
 *
 * @param str The string to unescape.
 * @returns The unescaped string.
 */
export const unescapeHtml = (str: string = ''): string => {
  if (typeof str !== 'string' || !str) {
    return '';
  }

  return str.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, (entity) => HTML_UNESCAPES[entity] || entity);
};
