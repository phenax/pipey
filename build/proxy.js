"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.definePlugin = definePlugin;
exports.default = void 0;
var customPlugins = [];

function evaluate(prop, obj) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  for (var _i = 0; _i < customPlugins.length; _i++) {
    var _customPlugins$_i = customPlugins[_i],
        pred = _customPlugins$_i.pred,
        evaluator = _customPlugins$_i.evaluator;

    if (pred.apply(void 0, [prop, obj].concat(args))) {
      return evaluator.apply(void 0, [prop, obj].concat(args));
    }
  }

  if (typeof obj[prop] !== 'function') throw new Error("".concat(prop, " is not a method in ").concat(obj));
  return obj[prop].apply(obj, args);
}

var pipey = new Proxy({}, {
  get: function get(_, prop) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return function (obj) {
        return evaluate.apply(void 0, [prop, obj].concat(args));
      };
    };
  }
});

function definePlugin(pred, evaluator) {
  customPlugins.push({
    pred: pred,
    evaluator: evaluator
  });
}

;
definePlugin(function (key) {
  return key === '$prop';
}, function (_, obj, key) {
  return obj[key];
});
var _default = pipey;
exports.default = _default;