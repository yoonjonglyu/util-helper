import isBrowser from '../../typecheck/isBrowser/isBrowser';

function getLocalStorage<T>(key: string): T | null {
  try {
    if (!isBrowser()) throw new Error('env not broswer.');
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error retrieving key "${key}" from localStorage:`, error);
    return null;
  }
}
export default getLocalStorage;
