import isFunction from './isFunction/isFunction';
import isArray from './isArray/isArray';
import isString from './isString/isString';
import isNumber from './isNumber/isNumber';
import isSymbol from './isSymbol/isSymbol';
import isNull from './isNull/isNull';
import isObject from './isObject/isObject';
import isBlob from './isBlob/isBlob';
import isUndefined from './isUndefined/isUndefined';
import isFalsy from './isFalsy/isFalsy';
import isTruthy from './isTruthy/isTruthy';
import isToday from './isToday/isToday';
import isDarkMode from './isDarkMode/isDarkMode';
import isTouchDevice from './isTouchDevice/isTouchDevice';
import isMobile from './isMobile/isMobile';
import isBrowser from './isBrowser/isBrowser';
import isNode from './isNode/isNode';
import isEmpty from './isEmpty/isEmpty';
import isEmail from './isEmail/isEmail';
import isUrl from './isUrl/isUrl';

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
});

export default TypeCheck;
