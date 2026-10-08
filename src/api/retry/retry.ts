import sleep from '../sleep/sleep';

export interface RetryOptions {
  retries?: number;
  delay?: number;
  backoff?: boolean;
  onRetry?: (error: any, attempt: number) => void;
}

/**
 * Retries an async function with customizable delay and optional exponential backoff.
 * @param fn Async function to execute.
 * @param options Configuration for retry attempts, delay, and backoff.
 */
async function retry<T>(
  fn: (attempt: number) => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const { retries = 3, delay = 1000, backoff = true, onRetry } = options;

  let lastError: any;
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      return await fn(attempt);
    } catch (error) {
      lastError = error;
      if (attempt > retries) {
        break;
      }

      onRetry?.(error, attempt);

      const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
      if (waitTime > 0) {
        await sleep(waitTime);
      }
    }
  }

  throw lastError;
}

export default retry;
