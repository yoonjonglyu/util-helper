import { pick } from './pick';

describe('pick', () => {
  it('should pick specified keys from object', () => {
    const user = { id: 1, name: 'Alice', age: 30, role: 'admin' };
    const picked = pick(user, ['name', 'role']);

    expect(picked).toEqual({ name: 'Alice', role: 'admin' });
    expect(picked).not.toHaveProperty('id');
    expect(picked).not.toHaveProperty('age');
  });

  it('should ignore keys that do not exist on source object', () => {
    const user = { id: 1, name: 'Alice' };
    const picked = pick(user, ['name', 'nonExistent' as any]);

    expect(picked).toEqual({ name: 'Alice' });
  });

  it('should handle nullish or invalid inputs', () => {
    expect(pick(null as any, ['a' as any])).toEqual({});
    expect(pick(undefined as any, ['a' as any])).toEqual({});
    expect(pick({ a: 1 }, null as any)).toEqual({});
  });
});
