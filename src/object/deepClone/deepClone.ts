/**
 * Creates a deep copy of a value, preserving references and supporting circular structures.
 *
 * @param value The value to deep clone.
 * @returns A deep copy of the input.
 */
export const deepClone = <T>(value: T): T => {
  const cloneInternal = (val: any, hash = new WeakMap()): any => {
    if (val === null || typeof val !== 'object') {
      return val;
    }

    if (hash.has(val)) {
      return hash.get(val);
    }

    if (val instanceof Date) {
      return new Date(val.getTime());
    }

    if (val instanceof RegExp) {
      return new RegExp(val.source, val.flags);
    }

    if (val instanceof Map) {
      const result = new Map();
      hash.set(val, result);
      val.forEach((v, k) => {
        result.set(cloneInternal(k, hash), cloneInternal(v, hash));
      });
      return result;
    }

    if (val instanceof Set) {
      const result = new Set();
      hash.set(val, result);
      val.forEach((v) => {
        result.add(cloneInternal(v, hash));
      });
      return result;
    }

    if (Array.isArray(val)) {
      const result: any[] = [];
      hash.set(val, result);
      for (let i = 0; i < val.length; i++) {
        result[i] = cloneInternal(val[i], hash);
      }
      return result;
    }

    const result: Record<string, any> = Object.create(Object.getPrototypeOf(val));
    hash.set(val, result);

    const keys = Reflect.ownKeys(val);
    for (const key of keys) {
      result[key as string] = cloneInternal(val[key as string], hash);
    }

    return result;
  };

  return cloneInternal(value);
};
