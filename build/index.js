"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromClassPrototype = exports.createPipes = void 0;

var _utils = require("./utils");

// type Accessors = Object Function
// type Class = Function
// createPipes :: [String] -> Accessors
var createPipes = function createPipes(methodNames) {
  return (0, _utils.fromPairs)(methodNames.filter(Boolean).map(function (method) {
    return [method, function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return function (obj) {
        return obj[method].apply(obj, args);
      };
    }];
  }));
}; // fromClassPrototype :: Class -> Accessors


exports.createPipes = createPipes;

var fromClassPrototype = function fromClassPrototype(Class) {
  return createPipes((0, _utils.getMethods)(Class));
};

exports.fromClassPrototype = fromClassPrototype;