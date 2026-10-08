import { pMap } from './concurrency';

describe('pMap', () => {
  it('should process all items and preserve original index ordering', async () => {
    const items = [10, 20, 30, 40];
    const results = await pMap(items, async (item) => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      return item * 2;
    });

    expect(results).toEqual([20, 40, 60, 80]);
  });

  it('should limit active concurrency', async () => {
    const items = [1, 2, 3, 4, 5, 6];
    let activeWorkers = 0;
    let maxObservedActive = 0;

    const results = await pMap(
      items,
      async (item) => {
        activeWorkers++;
        if (activeWorkers > maxObservedActive) {
          maxObservedActive = activeWorkers;
        }
        await new Promise((resolve) => setTimeout(resolve, 20));
        activeWorkers--;
        return item;
      },
      { concurrency: 2 }
    );

    expect(results).toEqual([1, 2, 3, 4, 5, 6]);
    expect(maxObservedActive).toBe(2);
  });

  it('should reject if any mapper invocation throws', async () => {
    const items = [1, 2, 3];
    await expect(
      pMap(items, async (item) => {
        if (item === 2) {
          throw new Error('Failure on 2');
        }
        return item;
      })
    ).rejects.toThrow('Failure on 2');
  });

  it('should handle empty or invalid inputs', async () => {
    expect(await pMap([], async (x) => x)).toEqual([]);
    expect(await pMap(null as any, async (x) => x)).toEqual([]);
  });
});
