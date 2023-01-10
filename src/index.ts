import TypeCheck from './typecheck';
import QueryString from './querystring';

export const { isArray, isFunction, isNumber, isString } = TypeCheck;
export const { getQuery, setQuery } = QueryString;
const UtilHelper = Object.freeze({
  TypeCheck,
  QueryString,
});

export default UtilHelper;
