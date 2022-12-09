"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omitEmptyStringAndNil;

var _isEmptystringOrNil = _interopRequireDefault(require("./is-emptystring-or-nil"));

var _omitProperty = _interopRequireDefault(require("./omit-property"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} object
 * @returns {Object}
 */
function omitEmptyStringAndNil(object) {
  return (0, _omitProperty.default)(object, _isEmptystringOrNil.default);
}
//# sourceMappingURL=omit-emptystring-and-nil.js.map