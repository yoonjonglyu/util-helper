import { kebabCase } from './kebabCase';

describe('kebabCase', () => {
  it('should convert spaces and mixed characters to kebab-case', () => {
    expect(kebabCase('Hello World')).toBe('hello-world');
    expect(kebabCase('  Leading and trailing spaces  ')).toBe('leading-and-trailing-spaces');
    expect(kebabCase('Multiple   spaces')).toBe('multiple-spaces');
    expect(kebabCase('Special-Characters!@#')).toBe('special-characters');
    expect(kebabCase('Mixed_Case-Input String')).toBe('mixed-case-input-string');
  });

  it('should convert camelCase and PascalCase correctly', () => {
    expect(kebabCase('helloWorld')).toBe('hello-world');
    expect(kebabCase('FooBarBaz')).toBe('foo-bar-baz');
  });

  it('should handle already kebab-case strings', () => {
    expect(kebabCase('already-kebab-case')).toBe('already-kebab-case');
  });

  it('should handle empty or invalid inputs', () => {
    expect(kebabCase('')).toBe('');
    expect(kebabCase('   ')).toBe('');
    expect(kebabCase(null as any)).toBe('');
  });
});
