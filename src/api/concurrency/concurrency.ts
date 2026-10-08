export interface PMapOptions {
  /** Maximum number of concurrent async operations. Defaults to Infinity. */
  concurrency?: number;
}

/**
 * Maps an array of items to asynchronous operations with a controlled concurrency limit.
 * Preserves the order of results matching the input array.
 *
 * @param items The array of items to process.
 * @param mapper The async function to invoke for each item.
 * @param options Options specifying the concurrency limit.
 * @returns A promise that resolves to an array of mapped results.
 */
export const pMap = async <T, R>(
  items: T[],
  mapper: (item: T, index: number) => Promise<R>,
  options: PMapOptions = {}
): Promise<R[]> => {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const concurrency = Math.max(1, Math.floor(options.concurrency ?? Infinity));
  const results = new Array<R>(items.length);
  let nextIndex = 0;

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex++;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  });

  await Promise.all(workers);

  return results;
};
