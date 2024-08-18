import isFunction from './isFunction/isFunction';
import isArray from './isArray/isArray';
import isString from './isString/isString';
import isNumber from './isNumber/isNumber';
import isSymbol from './isSymbol/isSymbol';
import isNull from './isNull/isNull';
import isObject from './isObject/isObject';
import isBlob from './isBlob/isBlob';
import isUndefined from './isUndefined/isUndefined';

const TypeCheck = Object.freeze({
  isFunction,
  isArray,
  isString,
  isNumber,
  isSymbol,
  isNull,
  isObject,
  isBlob,
  isUndefined,
});

export default TypeCheck;
