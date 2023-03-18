import TypeCheck from './typecheck';
import QueryString from './querystring';
import Format from './format';
import Import from './import';

export const { isArray, isFunction, isNumber, isString, isSymbol } = TypeCheck;
export const { getQuery, setQuery } = QueryString;
export const { addComma } = Format;
export const { loadCDN } = Import;
const UtilHelper = Object.freeze({
  TypeCheck,
  QueryString,
  Format,
  Import,
});

export default UtilHelper;
