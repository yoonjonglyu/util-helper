/**
 * Returns a new array with elements randomized in order using Fisher-Yates shuffle.
 * Does not mutate the original array.
 *
 * @param array The array to shuffle.
 * @returns A new shuffled array.
 */
export const shuffle = <T>(array: T[]): T[] => {
  if (!Array.isArray(array)) {
    return [];
  }

  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }

  return result;
};
