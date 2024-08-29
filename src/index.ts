import TypeCheck from './typecheck';
import QueryString from './querystring';
import Format from './format';
import Import from './import';
import Api from './api';
import Export from './export';

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
} = TypeCheck;
export const { getQuery, setQuery } = QueryString;
export const { addComma } = Format;
export const { loadCDN } = Import;
export const { debounce, throttle, getPlatfrom } = Api;
export const { download } = Export;
const UtilHelper = Object.freeze({
  TypeCheck,
  QueryString,
  Format,
  Import,
  Api,
  Export,
});

export default UtilHelper;
