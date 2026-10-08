import TypeCheck from './typecheck';
import QueryString from './querystring';
import Format from './format';
import Import from './import';
import Api from './api';
import Export from './export';
import Security from './security';
import Storage from './storage';
import Dom from './dom';
import * as Arr from './array';
import * as Obj from './object';

export const {
  isArray,
  isFunction,
  isNumber,
  isString,
  isSymbol,
  isNull,
  isObject,
  isBlob,
  isUndefined,
  isFalsy,
  isTruthy,
  isToday,
  isDarkMode,
  isTouchDevice,
  isMobile,
  isBrowser,
  isNode,
  isEmpty,
  isEmail,
  isUrl,
} = TypeCheck;

export const { getQuery, setQuery } = QueryString;

export const {
  addComma,
  formatDate,
  timeAgo,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  formatClass,
  cx,
  formatBytes,
  mask,
  truncate,
  escapeHtml,
  unescapeHtml,
} = Format;

export const { loadCDN } = Import;

export const {
  debounce,
  throttle,
  getPlatform,
  JobQueue,
  FlushQueue,
  sleep,
  retry,
  timeout,
  pMap,
  once,
} = Api;

export const { download } = Export;

export const {
  encryptData,
  decryptData,
  generateSalt,
  generatePassword,
  generatePasswordWithSalt,
  generatePasswordWithSaltAndEncrypt,
  decryptPasswordWithSalt,
  decryptPasswordWithSaltAndEncrypt,
} = Security.cryptos;

export const {
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
} = Storage;

export const {
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  copyToClipboard,
  scrollToTop,
  isInViewport,
  lockScroll,
} = Dom;

export const {
  chunk,
  unique,
  groupBy,
  shuffle,
  range,
} = Arr;

export const {
  pick,
  omit,
  deepClone,
  deepMerge,
} = Obj;

const UtilHelper = Object.freeze({
  TypeCheck,
  QueryString,
  Format,
  Import,
  Api,
  Export,
  Security,
  Storage,
  Dom,
  Array: Arr,
  Object: Obj,
});

export default UtilHelper;
