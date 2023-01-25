"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function loadCDN(id, src) {
  if (document.head.querySelector("#".concat(id)) === null) {
    var CDNNode = document.createElement('script');
    CDNNode.id = id;
    CDNNode.src = src;
    document.head.appendChild(CDNNode);
  }
}
var _default = loadCDN;
exports["default"] = _default;