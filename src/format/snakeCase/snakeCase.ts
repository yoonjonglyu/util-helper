function snakeCase(input: string = ''): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // split camelCase / PascalCase
    .toLowerCase()
    .replace(/[-_\W]+/g, ' ') // replace hyphens, underscores, special characters with space
    .trim() // remove leading/trailing spaces
    .replace(/\s+/g, '_'); // replace remaining spaces with underscore
}

export default snakeCase;
