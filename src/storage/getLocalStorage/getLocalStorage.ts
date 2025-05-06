function getLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error retrieving key "${key}" from localStorage:`, error);
    return null;
  }
}
export default getLocalStorage;