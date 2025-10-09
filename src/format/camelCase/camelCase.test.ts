import camelCase from './camelCase';

describe('camelCase', () => {
  it('should convert strings to camelCase', () => {
    expect(camelCase('hello world')).toBe('helloWorld');
    expect(camelCase('Hello World')).toBe('helloWorld');
    expect(camelCase('hello-world')).toBe('helloWorld');
    expect(camelCase('hello_world')).toBe('helloWorld');
    expect(camelCase('  hello   world  ')).toBe('helloWorld');
    expect(camelCase('HELLO WORLD')).toBe('helloWorld');
    expect(camelCase('hElLo WoRlD')).toBe('helloWorld');
    expect(camelCase('hello@world!')).toBe('helloWorld');
    expect(camelCase('123 hello world')).toBe('123HelloWorld');
    expect(camelCase('hello world 123')).toBe('helloWorld123');
    expect(camelCase('')).toBe('');
    expect(camelCase('   ')).toBe('');
  });
});