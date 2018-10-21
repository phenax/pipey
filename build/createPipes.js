"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

// createPipes :: [String] -> Accessors
var createPipes = function createPipes(methods) {
  return (0, _utils.fromPairs)(methods.filter(Boolean).map(function (method) {
    return [method, (0, _utils.createMethod)(method)];
  }));
};

var _default = createPipes;
exports.default = _default;