import isFunction from './isFunction/isFunction';
import isArray from './isArray/isArray';
import isString from './isString/isString';
import isNumber from './isNumber/isNumber';
declare const TypeCheck: Readonly<{
    isFunction: typeof isFunction;
    isArray: typeof isArray;
    isString: typeof isString;
    isNumber: typeof isNumber;
}>;
export default TypeCheck;
