const isPlainObject = (val: unknown): val is Record<string, any> => {
  return (
    typeof val === 'object' &&
    val !== null &&
    !Array.isArray(val) &&
    Object.prototype.toString.call(val) === '[object Object]'
  );
};

/**
 * Deeply merges two or more objects into a new object without mutating the inputs.
 * Protected against prototype pollution.
 *
 * @param target The target base object.
 * @param source The source object to merge into the target.
 * @returns A new deeply merged object.
 */
export const deepMerge = <T extends Record<string, any>, U extends Record<string, any>>(
  target: T,
  source: U
): T & U => {
  const result: any = Array.isArray(target) ? [...target] : { ...target };

  if (!isPlainObject(source)) {
    return result;
  }

  const keys = Object.keys(source);
  for (const key of keys) {
    // Prototype pollution defense
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }

    const targetVal = result[key];
    const sourceVal = source[key];

    if (isPlainObject(targetVal) && isPlainObject(sourceVal)) {
      result[key] = deepMerge(targetVal, sourceVal);
    } else if (Array.isArray(sourceVal)) {
      result[key] = [...sourceVal];
    } else if (sourceVal !== undefined) {
      result[key] = sourceVal;
    }
  }

  return result;
};
