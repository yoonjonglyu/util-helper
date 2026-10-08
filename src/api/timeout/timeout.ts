/**
 * Wraps a promise and rejects if it does not settle within the given timeout.
 * @param promise The promise to execute.
 * @param ms Timeout in milliseconds.
 * @param fallbackError Custom error or message when timed out.
 */
function timeout<T>(
  promise: Promise<T>,
  ms: number,
  fallbackError?: Error | string,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      const err =
        fallbackError instanceof Error
          ? fallbackError
          : new Error(
              typeof fallbackError === 'string'
                ? fallbackError
                : `Operation timed out after ${ms}ms`,
            );
      reject(err);
    }, ms);
  });

  return Promise.race([
    promise.then((res) => {
      clearTimeout(timer);
      return res;
    }).catch((err) => {
      clearTimeout(timer);
      throw err;
    }),
    timeoutPromise,
  ]);
}

export default timeout;
