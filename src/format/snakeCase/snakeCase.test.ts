import snakeCase from './snakeCase';

describe('snakeCase', () => {
  it('should convert a string to snake_case', () => {
    expect(snakeCase('Hello World')).toBe('hello_world');
    expect(snakeCase('  Leading and trailing spaces  ')).toBe(
      'leading_and_trailing_spaces'
    );
        expect(snakeCase('    Leading and trailing spaces    ')).toBe(
      'leading_and_trailing_spaces'
    );
    expect(snakeCase('Multiple   spaces')).toBe('multiple_spaces');
    expect(snakeCase('Special-Characters!@#')).toBe('special_characters');
    expect(snakeCase('Mixed_Case-Input String')).toBe('mixed_case_input_string');
    expect(snakeCase('already_snake_case')).toBe('already_snake_case');
    expect(snakeCase('')).toBe('');
    expect(snakeCase('   ')).toBe('');
  });
});