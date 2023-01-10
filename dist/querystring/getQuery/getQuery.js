"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function getQuery() {
  return new URLSearchParams(window.location.search);
}
var _default = getQuery;
exports["default"] = _default;