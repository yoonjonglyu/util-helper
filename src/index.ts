import TypeCheck from './typecheck';
import QueryString from './querystring';
import Format from './format';
import Import from './import';
import Api from './api';
import Export from './export';
import Security from './security';
import Storage from './storage';
import Dom from './dom';

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
} = TypeCheck;
export const { getQuery, setQuery } = QueryString;
export const {
  addComma,
  formatDate,
  timeAgo,
  camelCase,
  pascalCase,
  snakeCase,
  formatClass,
  cx,
} = Format;
export const { loadCDN } = Import;
export const { debounce, throttle, getPlatform, JobQueue, FlushQueue, sleep } =
  Api;
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
export const { setLocalStorage, getLocalStorage, removeLocalStorage, idb } =
  Storage;
export const { hasClass, addClass, removeClass, toggleClass } = Dom;

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
});

export default UtilHelper;
