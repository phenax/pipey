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
exports.fromClassPrototype = exports.createPipes = exports.P = void 0;

var _utils = require("./utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var P = function P(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$fns = _ref.fns,
      fns = _ref$fns === void 0 ? [] : _ref$fns;

  return {
    pipe: function pipe(fn) {
      return P(value, {
        fns: fns.concat([fn])
      });
    },
    getValue: function getValue() {
      return _utils.compose.apply(void 0, _toConsumableArray(fns.reverse()))(value);
    }
  };
}; // createPipes :: [String] -> Accessors


exports.P = P;
var createPipes = (0, _utils.compose)(_utils.fromPairs, (0, _utils.map)(function (method) {
  return [method, (0, _utils.createMethod)(method)];
}), (0, _utils.filter)(Boolean)); // fromClassPrototype :: Class -> Accessors

exports.createPipes = createPipes;
var fromClassPrototype = (0, _utils.compose)(createPipes, _utils.getMethods);
exports.fromClassPrototype = fromClassPrototype;