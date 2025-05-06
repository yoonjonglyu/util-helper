function removeLocalStorage(key: string): void {
  if (!key) {
    console.warn('Key is required to remove an item from localStorage.');
    return;
  }

  try {
    localStorage.removeItem(key);
    console.log(`Item with key "${key}" removed from localStorage.`);
  } catch (error) {
    console.error(
      `Failed to remove item with key "${key}" from localStorage:`,
      error,
    );
  }
}

export default removeLocalStorage;
