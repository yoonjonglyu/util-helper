"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setQuery = exports.isString = exports.isNumber = exports.isFunction = exports.isArray = exports.getQuery = exports["default"] = exports.addComma = void 0;
var _typecheck = _interopRequireDefault(require("./typecheck"));
var _querystring = _interopRequireDefault(require("./querystring"));
var _format = _interopRequireDefault(require("./format"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isArray = _typecheck["default"].isArray,
  isFunction = _typecheck["default"].isFunction,
  isNumber = _typecheck["default"].isNumber,
  isString = _typecheck["default"].isString;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isFunction = isFunction;
exports.isArray = isArray;
var getQuery = _querystring["default"].getQuery,
  setQuery = _querystring["default"].setQuery;
exports.setQuery = setQuery;
exports.getQuery = getQuery;
var addComma = _format["default"].addComma;
exports.addComma = addComma;
var UtilHelper = Object.freeze({
  TypeCheck: _typecheck["default"],
  QueryString: _querystring["default"],
  Format: _format["default"]
});
var _default = UtilHelper;
exports["default"] = _default;