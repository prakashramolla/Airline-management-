"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omitProperty;

var _isObject = _interopRequireDefault(require("./is-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} object
 * @param {Function} predicateFn
 * @returns {Object}
 */
function omitProperty(object, predicateFn) {
  if (!(0, _isObject.default)(object)) {
    return object;
  }

  var keys = Object.keys(object);
  return keys.reduce(function (result, key) {
    var value = object[key];

    if (!predicateFn(value)) {
      result[key] = value;
    }

    return result;
  }, {});
}
//# sourceMappingURL=omit-property.js.map