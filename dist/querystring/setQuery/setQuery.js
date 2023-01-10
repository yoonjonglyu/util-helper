"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function setQuery(query) {
  window.history.pushState({}, '', "?".concat(query.toString()));
}
var _default = setQuery;
exports["default"] = _default;