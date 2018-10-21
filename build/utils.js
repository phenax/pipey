"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = exports.map = exports.compose = exports.getMethods = exports.createMethod = exports.fromPairs = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// fromPairs :: [[String, b]] -> Object b
var fromPairs = function fromPairs(pairs) {
  return pairs.reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return _objectSpread({}, acc, _defineProperty({}, k, v));
  }, {});
}; // createMethod :: String -> (...*) -> * -> *


exports.fromPairs = fromPairs;

var createMethod = function createMethod(method) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (obj) {
      return obj[method].apply(obj, args);
    };
  };
}; // isFunction :: * -> Bool


exports.createMethod = createMethod;

var isFunction = function isFunction(fn) {
  return fn instanceof Function;
}; // getMethods :: Class -> [String]


var getMethods = function getMethods(Class) {
  return !Class || !Class.prototype ? [] : Object.getOwnPropertyNames(Class.prototype).filter(function (key) {
    return key !== 'constructor';
  }).filter(function (key) {
    return isFunction(Class.prototype[key]);
  });
}; // compose :: (...Function) -> Function


exports.getMethods = getMethods;

var compose = function compose() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return fns.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}; // map :: (a -> b) -> [a] -> [b]


exports.compose = compose;

var map = function map(fn) {
  return function (arr) {
    return arr.map(fn);
  };
}; // filter :: (a -> Bool) -> [a] -> [a]


exports.map = map;

var filter = function filter(fn) {
  return function (arr) {
    return arr.filter(fn);
  };
};

exports.filter = filter;