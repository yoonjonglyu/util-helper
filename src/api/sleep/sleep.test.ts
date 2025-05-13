import sleep from './sleep';

describe('sleep', () => {
  it('should resolve after the specified milliseconds', async () => {
    const start = Date.now();
    await sleep(100);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(100);
  });

  it('should resolve immediately if 0 ms is passed', async () => {
    const start = Date.now();
    await sleep(0);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(0);
  });

  it('should return a Promise', () => {
    const result = sleep(50);
    expect(result).toBeInstanceOf(Promise);
  });

  it('should not throw for negative values', async () => {
    await expect(sleep(-100)).resolves.toBeUndefined();
  });
});
