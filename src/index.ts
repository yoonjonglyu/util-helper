import TypeCheck from './typecheck';
import QueryString from './querystring';
import Format from './format';
import Import from './import';
import Api from './api';

export const {
  isArray,
  isFunction,
  isNumber,
  isString,
  isSymbol,
  isNull,
  isObject,
  isBlob,
} = TypeCheck;
export const { getQuery, setQuery } = QueryString;
export const { addComma } = Format;
export const { loadCDN } = Import;
export const { debounce, throttle } = Api;
const UtilHelper = Object.freeze({
  TypeCheck,
  QueryString,
  Format,
  Import,
  Api,
});

export default UtilHelper;
