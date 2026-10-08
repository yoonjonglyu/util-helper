/**
 * Creates a function that is restricted to invoking fn once.
 * Repeat calls to the function return the value of the first invocation.
 *
 * @param fn The function to restrict.
 * @returns The new restricted function.
 */
export const once = <T extends (...args: any[]) => any>(fn: T): T => {
  let called = false;
  let result: ReturnType<T>;

  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  } as T;
};
