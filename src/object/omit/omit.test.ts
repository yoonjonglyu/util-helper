import { omit } from './omit';

describe('omit', () => {
  it('should omit specified keys from object', () => {
    const user = { id: 1, name: 'Alice', age: 30, role: 'admin' };
    const omitted = omit(user, ['age', 'role']);

    expect(omitted).toEqual({ id: 1, name: 'Alice' });
    expect(omitted).not.toHaveProperty('age');
    expect(omitted).not.toHaveProperty('role');
  });

  it('should return shallow copy if keys to omit are not in object', () => {
    const user = { id: 1, name: 'Alice' };
    const omitted = omit(user, ['nonExistent' as any]);

    expect(omitted).toEqual({ id: 1, name: 'Alice' });
  });

  it('should handle nullish or invalid inputs', () => {
    expect(omit(null as any, ['a' as any])).toEqual({});
    expect(omit(undefined as any, ['a' as any])).toEqual({});
    expect(omit({ a: 1 }, null as any)).toEqual({ a: 1 });
  });
});
