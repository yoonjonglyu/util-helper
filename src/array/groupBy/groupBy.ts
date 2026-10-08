/**
 * Creates an object composed of keys generated from the results of running
 * each element of collection through iteratee.
 *
 * @param array The array to iterate over.
 * @param iteratee The iteratee to transform elements into keys.
 * @returns An object of grouped arrays.
 */
export const groupBy = <T, K extends PropertyKey>(
  array: T[],
  iteratee: (item: T) => K
): Record<K, T[]> => {
  const result = {} as Record<K, T[]>;

  if (!Array.isArray(array) || typeof iteratee !== 'function') {
    return result;
  }

  for (const item of array) {
    const key = iteratee(item);
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
};
