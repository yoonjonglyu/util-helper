import isBrowser from '../../typecheck/isBrowser/isBrowser';

/**
 * Retrieves and deserializes a value from sessionStorage.
 * @param key The sessionStorage key.
 * @returns The parsed value, or null if key does not exist or parsing fails.
 */
export function getSessionStorage<T = any>(key: string): T | null {
  try {
    if (!isBrowser()) return null;
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error retrieving key "${key}" from sessionStorage:`, error);
    return null;
  }
}

/**
 * Serializes and stores a value into sessionStorage.
 * @param key The sessionStorage key.
 * @param value The value to store.
 */
export function setSessionStorage(key: string, value: any): void {
  try {
    if (!isBrowser()) return;
    const serialized = JSON.stringify(value);
    sessionStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error setting key "${key}" in sessionStorage:`, error);
  }
}

/**
 * Removes an item from sessionStorage.
 * @param key The sessionStorage key.
 */
export function removeSessionStorage(key: string): void {
  try {
    if (!isBrowser() || !key) return;
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from sessionStorage:`, error);
  }
}

const session = Object.freeze({
  get: getSessionStorage,
  set: setSessionStorage,
  remove: removeSessionStorage,
});

export default session;
