import timeout from './timeout';
import sleep from '../sleep/sleep';

describe('timeout', () => {
  it('should resolve if promise settles before timeout', async () => {
    const fastPromise = sleep(10).then(() => 'quick');
    const result = await timeout(fastPromise, 100);

    expect(result).toBe('quick');
  });

  it('should reject with default error when promise exceeds timeout', async () => {
    const slowPromise = sleep(150).then(() => 'slow');

    await expect(timeout(slowPromise, 20)).rejects.toThrow(
      'Operation timed out after 20ms',
    );
  });

  it('should reject with custom error when specified', async () => {
    const slowPromise = sleep(150);
    const customError = new Error('Custom timeout error');

    await expect(timeout(slowPromise, 20, customError)).rejects.toThrow(
      'Custom timeout error',
    );
  });
});
