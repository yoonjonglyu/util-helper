import { range } from './range';

describe('range', () => {
  it('should generate range from 0 to end', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
    expect(range(0)).toEqual([]);
  });

  it('should generate range from start to end', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
  });

  it('should generate range with positive step', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    expect(range(1, 10, 3)).toEqual([1, 4, 7]);
  });

  it('should generate range with negative step', () => {
    expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
  });

  it('should return empty array when step is 0 or direction does not match', () => {
    expect(range(0, 5, 0)).toEqual([]);
    expect(range(5, 0, 1)).toEqual([]);
    expect(range(0, 5, -1)).toEqual([]);
  });
});
