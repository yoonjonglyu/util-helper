import retry from './retry';

describe('retry', () => {
  it('should resolve immediately if function succeeds on first try', async () => {
    const fn = jest.fn().mockResolvedValue('success');
    const result = await retry(fn, { retries: 3, delay: 10 });

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry on failure and resolve if subsequent try succeeds', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValue('finally success');

    const onRetry = jest.fn();
    const result = await retry(fn, { retries: 3, delay: 10, backoff: false, onRetry });

    expect(result).toBe('finally success');
    expect(fn).toHaveBeenCalledTimes(3);
    expect(onRetry).toHaveBeenCalledTimes(2);
  });

  it('should reject with the last error if all retries are exhausted', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('always fail'));

    await expect(retry(fn, { retries: 2, delay: 5, backoff: false })).rejects.toThrow('always fail');
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
