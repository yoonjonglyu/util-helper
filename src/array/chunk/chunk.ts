/**
 * Splits an array into chunks of the specified size.
 *
 * @param array The array to split.
 * @param size The chunk size (must be greater than 0).
 * @returns An array containing the chunked subarrays.
 */
export const chunk = <T>(array: T[], size: number = 1): T[][] => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  const chunkSize = Math.max(1, Math.floor(size));
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
};
