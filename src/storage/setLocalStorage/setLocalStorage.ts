import isBroswer from '../../typecheck/isBrowser/isBrowser';

const setLocalStorage = (key: string, value: any): void => {
  try {
    if (!isBroswer()) throw new Error('env not broswer');
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting localStorage item:', error);
  }
};

export default setLocalStorage;
