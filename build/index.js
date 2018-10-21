"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromClassPrototype = exports.createPipes = void 0;

var _utils = require("./utils");

// type Accessors = Object Function
// type Class = Function
// createPipes :: [String] -> Accessors
var createPipes = function createPipes(methods) {
  return (0, _utils.fromPairs)(methods.filter(Boolean).map(function (method) {
    return [method, (0, _utils.createMethod)(method)];
  }));
}; // fromClassPrototype :: Class -> Accessors


exports.createPipes = createPipes;

var fromClassPrototype = function fromClassPrototype(Class) {
  return createPipes((0, _utils.getMethods)(Class));
};

exports.fromClassPrototype = fromClassPrototype;