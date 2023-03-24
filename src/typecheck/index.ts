import isFunction from './isFunction/isFunction';
import isArray from './isArray/isArray';
import isString from './isString/isString';
import isNumber from './isNumber/isNumber';
import isSymbol from './isSymbol/isSymbol';
import isNull from './isNull/isNull';

const TypeCheck = Object.freeze({
  isFunction,
  isArray,
  isString,
  isNumber,
  isSymbol,
  isNull,
});

export default TypeCheck;
