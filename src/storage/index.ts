import setLocalStorage from './setLocalStorage/setLocalStorage';
import getLocalStorage from './getLocalStorage/getLocalStorage';
import removeLocalStorage from './removeLocalStorage/removeLocalStorage';
import idb from './idb/idb';
import cookie, { getCookie, setCookie, removeCookie } from './cookie/cookie';
import session, {
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
} from './sessionStorage/sessionStorage';

const Storage = Object.freeze({
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  idb,
  cookie,
  getCookie,
  setCookie,
  removeCookie,
  session,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
});
export default Storage;
