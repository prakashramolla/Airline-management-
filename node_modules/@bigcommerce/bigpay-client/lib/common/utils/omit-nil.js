"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omitNil;

var _isNil = _interopRequireDefault(require("./is-nil"));

var _omitProperty = _interopRequireDefault(require("./omit-property"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} object
 * @returns {Object}
 */
function omitNil(object) {
  return (0, _omitProperty.default)(object, _isNil.default);
}
//# sourceMappingURL=omit-nil.js.map