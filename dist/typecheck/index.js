"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _isFunction = _interopRequireDefault(require("./isFunction/isFunction"));
var _isArray = _interopRequireDefault(require("./isArray/isArray"));
var _isString = _interopRequireDefault(require("./isString/isString"));
var _isNumber = _interopRequireDefault(require("./isNumber/isNumber"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var TypeCheck = Object.freeze({
  isFunction: _isFunction["default"],
  isArray: _isArray["default"],
  isString: _isString["default"],
  isNumber: _isNumber["default"]
});
var _default = TypeCheck;
exports["default"] = _default;