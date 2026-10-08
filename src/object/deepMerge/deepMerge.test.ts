import { deepMerge } from './deepMerge';

describe('deepMerge', () => {
  it('should deeply merge two objects into a new object', () => {
    const target = { a: 1, b: { c: 2, d: 3 } };
    const source = { b: { d: 4, e: 5 }, f: 6 };

    const merged = deepMerge(target, source);

    expect(merged).toEqual({
      a: 1,
      b: { c: 2, d: 4, e: 5 },
      f: 6,
    });
    expect(merged).not.toBe(target);
    expect(merged.b).not.toBe(target.b);
  });

  it('should replace array properties rather than concatenating them', () => {
    const target = { list: [1, 2] };
    const source = { list: [3, 4] };

    const merged = deepMerge(target, source);
    expect(merged.list).toEqual([3, 4]);
    expect(merged.list).not.toBe(source.list);
  });

  it('should prevent prototype pollution attempts', () => {
    const malicious = JSON.parse('{"__proto__": {"polluted": true}}');
    const target = {};

    deepMerge(target, malicious);
    expect((target as any).polluted).toBeUndefined();
    expect(({} as any).polluted).toBeUndefined();
  });

  it('should handle non-object sources safely', () => {
    const target = { a: 1 };
    expect(deepMerge(target, null as any)).toEqual({ a: 1 });
    expect(deepMerge(target, undefined as any)).toEqual({ a: 1 });
  });
});
