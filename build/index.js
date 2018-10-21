"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromClassPrototype = exports.createPipes = void 0;

var _utils = require("./utils");

// type Accessors = Object Function
// type Class = Function
// createPipes :: [String] -> Accessors
var createPipes = (0, _utils.compose)(_utils.fromPairs, (0, _utils.map)(function (method) {
  return [method, (0, _utils.createMethod)(method)];
}), (0, _utils.filter)(Boolean)); // fromClassPrototype :: Class -> Accessors

exports.createPipes = createPipes;
var fromClassPrototype = (0, _utils.compose)(createPipes, _utils.getMethods);
exports.fromClassPrototype = fromClassPrototype;