import TypeCheck from './typecheck';
import QueryString from './querystring';
import Format from './format';

export const { isArray, isFunction, isNumber, isString } = TypeCheck;
export const { getQuery, setQuery } = QueryString;
export const { addComma } = Format;
const UtilHelper = Object.freeze({
  TypeCheck,
  QueryString,
  Format,
});

export default UtilHelper;
