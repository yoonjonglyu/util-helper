import formatClass, { cx } from './formatClass';

describe('formatClass', () => {
  test('returns empty string when called with no args', () => {
    expect(formatClass()).toBe('');
  });

  test('handles strings and numbers including 0', () => {
    expect(formatClass('a', 0, 1)).toBe('a 0 1');
  });

  test('ignores empty string, null and undefined', () => {
    expect(formatClass('', null, undefined, 'b')).toBe('b');
  });

  test('ignores standalone booleans but includes object keys with boolean values', () => {
    expect(formatClass(true, false, 'c')).toBe('c');
    expect(formatClass({ a: true, b: false })).toBe('a');
  });

  test('includes object keys for truthy non-boolean values and excludes falsy ones (like 0)', () => {
    expect(formatClass({ a: 'yes', b: '', c: 1, d: 0, e: null })).toBe('a c');
  });

  test('processes arrays and nested arrays/objects recursively', () => {
    const input = ['a', ['b', { c: true }], null, 0];
    expect(formatClass(input)).toBe('a b c 0');
  });

  test('ignores inherited prototype properties on objects', () => {
    const proto = { inherited: true };
    const obj = Object.create(proto) as Record<string, any>;
    obj.own = true;
    expect(formatClass(obj)).toBe('own');
  });

  test('cx alias is the same function as default export and works', () => {
    expect(cx).toBe(formatClass);
    expect(cx('x', { y: true })).toBe('x y');
  });

  test('complex mixed input produces expected class string', () => {
    const result = formatClass(
      'a',
      { b: true, c: false },
      ['d', { e: true, f: 0 }, ['g', ['', null]]],
      0,
      undefined
    );
    expect(result).toBe('a b d e g 0');
  });
});