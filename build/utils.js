"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMethods = exports.compose = void 0;

// compose :: (...Function) -> Function
var compose = function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}; // getMethods :: Class -> [String]


exports.compose = compose;

var getMethods = function getMethods(Class) {
  return Object.getOwnPropertyNames((Class || {}).prototype || {}).filter(function (key) {
    return key !== 'constructor' && Class.prototype[key] instanceof Function;
  });
};

exports.getMethods = getMethods;