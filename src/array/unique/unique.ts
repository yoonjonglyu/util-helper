/**
 * Returns a duplicate-free version of an array.
 * Optionally accepts an iteratee function to determine uniqueness.
 *
 * @param array The array to inspect.
 * @param iteratee Optional function invoked per element to produce the criterion for uniqueness.
 * @returns The new duplicate-free array.
 */
export const unique = <T>(
  array: T[],
  iteratee?: (item: T) => unknown
): T[] => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  if (!iteratee) {
    return Array.from(new Set(array));
  }

  const seen = new Set<unknown>();
  const result: T[] = [];

  for (const item of array) {
    const key = iteratee(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
};
