import setLocalStorage from './setLocalStorage/setLocalStorage';
import getLocalStorage from './getLocalStorage/getLocalStorage';
import removeLocalStorage from './removeLocalStorage/removeLocalStorage';
import idb from './idb/idb';

const Storage = Object.freeze({
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  idb,
});
export default Storage;
