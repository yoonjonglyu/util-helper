import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('should retain all original elements and array length', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled = shuffle(original);

    expect(shuffled).toHaveLength(original.length);
    expect(shuffled.slice().sort((a, b) => a - b)).toEqual(original);
  });

  it('should not mutate original array', () => {
    const original = [1, 2, 3];
    const copy = [...original];
    shuffle(original);
    expect(original).toEqual(copy);
  });

  it('should handle empty or invalid inputs', () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle(null as any)).toEqual([]);
    expect(shuffle(undefined as any)).toEqual([]);
  });
});
