"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "compose", {
  enumerable: true,
  get: function get() {
    return _utils.compose;
  }
});
exports.fromClassPrototype = exports.createPipes = exports.createPipe = void 0;

var _utils = require("./utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// type Accessor = (a) -> Object ((a) -> b) -> b
// type Class = Function
// createPipe :: String -> Accessor
var createPipe = function createPipe(method) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (obj) {
      return obj[method].apply(obj, args);
    };
  };
}; // This is beautiful. My library in action.


exports.createPipe = createPipe;
var map = createPipe('map');
var filter = createPipe('filter');
var reduce = createPipe('reduce'); // createPipes :: [String] -> Object Accessor

var createPipes = (0, _utils.compose)(reduce(function (acc, method) {
  return _objectSpread({}, acc, _defineProperty({}, method, createPipe(method)));
}, {}), filter(Boolean)); // fromClassPrototype :: Class -> Accessors

exports.createPipes = createPipes;
var fromClassPrototype = (0, _utils.compose)(createPipes, _utils.getMethods);
exports.fromClassPrototype = fromClassPrototype;