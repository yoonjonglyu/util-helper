/**
 * Pauses execution for the specified number of milliseconds.
 * @param ms Number of milliseconds to sleep.
 * @param signal Optional AbortSignal to cancel sleeping early.
 * @returns Promise that resolves after the specified time.
 */
function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(signal.reason ?? new DOMException('This operation was aborted', 'AbortError'));
    }

    const timer = setTimeout(() => {
      resolve();
    }, Math.max(0, ms));

    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(signal.reason ?? new DOMException('This operation was aborted', 'AbortError'));
      },
      { once: true },
    );
  });
}
export default sleep;