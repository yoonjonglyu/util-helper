import pascalCase from './pascalCase';

describe('pascalCase', () => {
  it('should convert string to PascalCase', () => {
    expect(pascalCase('hello world')).toBe('HelloWorld');
    expect(pascalCase('Pascal case example')).toBe('PascalCaseExample');
    expect(pascalCase('multiple   spaces')).toBe('MultipleSpaces'); // Extra spaces
    expect(pascalCase('special@#characters!')).toBe('SpecialCharacters'); // Special characters
    expect(pascalCase('123 numbers 456')).toBe('123Numbers456'); // Numbers
    expect(pascalCase('')).toBe(''); // Empty string
    expect(pascalCase('   ')).toBe(''); // String with only spaces
  });
});