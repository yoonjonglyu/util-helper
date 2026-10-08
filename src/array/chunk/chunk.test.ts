import { chunk } from './chunk';

describe('chunk', () => {
  it('should split array into chunks of the given size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
  });

  it('should default to size 1 when size is not provided', () => {
    expect(chunk([1, 2, 3])).toEqual([[1], [2], [3]]);
  });

  it('should handle chunk size larger than array length', () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  it('should handle empty or invalid input', () => {
    expect(chunk([])).toEqual([]);
    expect(chunk(null as any)).toEqual([]);
    expect(chunk(undefined as any)).toEqual([]);
  });

  it('should clamp size to at least 1', () => {
    expect(chunk([1, 2, 3], 0)).toEqual([[1], [2], [3]]);
    expect(chunk([1, 2, 3], -5)).toEqual([[1], [2], [3]]);
  });
});
