import { deepClone } from './deepClone';

describe('deepClone', () => {
  it('should clone primitive values', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  it('should deep clone nested objects and arrays', () => {
    const original = {
      name: 'Alice',
      address: { city: 'Seoul', zip: 12345 },
      tags: ['a', 'b', { nested: true }],
    };
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.address).not.toBe(original.address);
    expect(cloned.tags).not.toBe(original.tags);
    expect(cloned.tags[2]).not.toBe(original.tags[2]);
  });

  it('should clone Date and RegExp instances', () => {
    const date = new Date('2026-01-01T00:00:00.000Z');
    const regex = /test/gi;
    const clonedDate = deepClone(date);
    const clonedRegex = deepClone(regex);

    expect(clonedDate).toEqual(date);
    expect(clonedDate).not.toBe(date);
    expect(clonedRegex).toEqual(regex);
    expect(clonedRegex).not.toBe(regex);
  });

  it('should clone Map and Set structures', () => {
    const map = new Map<string, any>([['k1', { v: 1 }]]);
    const set = new Set([{ v: 2 }]);

    const clonedMap = deepClone(map);
    const clonedSet = deepClone(set);

    expect(clonedMap.get('k1')).toEqual({ v: 1 });
    expect(clonedMap.get('k1')).not.toBe(map.get('k1'));

    const setItem = Array.from(set)[0];
    const clonedSetItem = Array.from(clonedSet)[0];
    expect(clonedSetItem).toEqual(setItem);
    expect(clonedSetItem).not.toBe(setItem);
  });

  it('should handle circular references without infinite recursion', () => {
    const circular: any = { name: 'circular' };
    circular.self = circular;

    const cloned = deepClone(circular);
    expect(cloned.name).toBe('circular');
    expect(cloned.self).toBe(cloned);
    expect(cloned).not.toBe(circular);
  });
});
