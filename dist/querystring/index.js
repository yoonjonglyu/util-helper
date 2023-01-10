"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _getQuery = _interopRequireDefault(require("./getQuery/getQuery"));
var _setQuery = _interopRequireDefault(require("./setQuery/setQuery"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var QueryString = Object.freeze({
  getQuery: _getQuery["default"],
  setQuery: _setQuery["default"]
});
var _default = QueryString;
exports["default"] = _default;