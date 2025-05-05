import TypeCheck from './typecheck';
import QueryString from './querystring';
import Format from './format';
import Import from './import';
import Api from './api';
import Export from './export';
import Security from './security';

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
} = TypeCheck;
export const { getQuery, setQuery } = QueryString;
export const { addComma, formatDate, timeAgo } = Format;
export const { loadCDN } = Import;
export const { debounce, throttle, getPlatfrom } = Api;
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

const UtilHelper = Object.freeze({
  TypeCheck,
  QueryString,
  Format,
  Import,
  Api,
  Export,
  Security,
});

export default UtilHelper;
