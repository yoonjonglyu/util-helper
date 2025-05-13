/**
 * Pauses execution for the specified number of milliseconds.
 * @param ms Number of milliseconds to sleep.
 * @returns Promise that resolves after the specified time.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default sleep;