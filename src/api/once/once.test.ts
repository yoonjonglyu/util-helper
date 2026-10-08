import { once } from './once';

describe('once', () => {
  it('should invoke the wrapped function only once', () => {
    const fn = jest.fn((x: number) => x * 2);
    const onceFn = once(fn);

    expect(onceFn(5)).toBe(10);
    expect(onceFn(10)).toBe(10);
    expect(onceFn(20)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(5);
  });

  it('should maintain this context correctly', () => {
    const context = {
      factor: 3,
      calc: once(function (this: any, val: number) {
        return val * this.factor;
      }),
    };

    expect(context.calc(4)).toBe(12);
    expect(context.calc(5)).toBe(12);
  });
});
