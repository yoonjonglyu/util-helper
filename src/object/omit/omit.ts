/**
 * Creates an object composed of the source object properties with specified keys omitted.
 *
 * @param obj The source object.
 * @param keys The property names to omit.
 * @returns The new object with omitted properties.
 */
export const omit = <T extends Record<PropertyKey, any>, K extends keyof T>(
  obj: T,
  keys: readonly K[] | K[]
): Omit<T, K> => {
  const result = {} as Omit<T, K>;

  if (!obj || typeof obj !== 'object') {
    return result;
  }

  const omitSet = new Set<PropertyKey>(Array.isArray(keys) ? keys : []);

  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (!omitSet.has(key)) {
      (result as any)[key] = obj[key];
    }
  }

  return result;
};
