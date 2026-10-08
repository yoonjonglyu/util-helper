import { unique } from './unique';

describe('unique', () => {
  it('should remove duplicate primitive values', () => {
    expect(unique([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    expect(unique([true, false, true])).toEqual([true, false]);
  });

  it('should deduplicate using custom iteratee', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice 2' },
    ];
    expect(unique(users, (u) => u.id)).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  it('should deduplicate strings case-insensitively with iteratee', () => {
    expect(unique(['Apple', 'apple', 'BANANA', 'banana'], (s) => s.toLowerCase())).toEqual([
      'Apple',
      'BANANA',
    ]);
  });

  it('should return empty array for invalid or empty inputs', () => {
    expect(unique([])).toEqual([]);
    expect(unique(null as any)).toEqual([]);
    expect(unique(undefined as any)).toEqual([]);
  });
});
