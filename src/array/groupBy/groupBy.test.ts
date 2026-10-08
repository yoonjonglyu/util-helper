import { groupBy } from './groupBy';

describe('groupBy', () => {
  it('should group items by string key', () => {
    const items = [
      { category: 'fruit', name: 'apple' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'banana' },
    ];
    const grouped = groupBy(items, (item) => item.category);

    expect(grouped).toEqual({
      fruit: [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'banana' },
      ],
      vegetable: [{ category: 'vegetable', name: 'carrot' }],
    });
  });

  it('should group numbers by criterion', () => {
    const numbers = [6.1, 4.2, 6.3];
    const grouped = groupBy(numbers, Math.floor);

    expect(grouped).toEqual({
      4: [4.2],
      6: [6.1, 6.3],
    });
  });

  it('should handle empty or invalid inputs', () => {
    expect(groupBy([], (x) => x)).toEqual({});
    expect(groupBy(null as any, (x) => x)).toEqual({});
    expect(groupBy([1, 2], null as any)).toEqual({});
  });
});
