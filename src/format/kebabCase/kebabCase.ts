/**
 * Converts a string to kebab-case (e.g. "fooBar" -> "foo-bar").
 *
 * @param input The string to convert.
 * @returns The kebab-cased string.
 */
export const kebabCase = (input: string = ''): string => {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // split camelCase / PascalCase
    .toLowerCase()
    .replace(/[-_\W]+/g, ' ') // replace hyphens, underscores, special characters with space
    .trim()
    .replace(/\s+/g, '-');
};

export default kebabCase;
