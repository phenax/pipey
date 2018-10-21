"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createPipes = _interopRequireDefault(require("./createPipes"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// fromClassPrototype :: Class -> Accessors
var fromClassPrototype = function fromClassPrototype(Class) {
  return (0, _createPipes.default)((0, _utils.getMethods)(Class));
};

var _default = fromClassPrototype;
exports.default = _default;