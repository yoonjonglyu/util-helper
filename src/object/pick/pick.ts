/**
 * Creates an object composed of the picked object properties.
 *
 * @param obj The source object.
 * @param keys The property names to pick.
 * @returns The new object with picked properties.
 */
export const pick = <T extends Record<PropertyKey, any>, K extends keyof T>(
  obj: T,
  keys: readonly K[] | K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;

  if (!obj || typeof obj !== 'object' || !Array.isArray(keys)) {
    return result;
  }

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }

  return result;
};
