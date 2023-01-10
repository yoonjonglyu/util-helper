"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function isArray(arg) {
  if (Array.isArray !== undefined) {
    return Array.isArray(arg);
  } else {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
}
var _default = isArray;
exports["default"] = _default;