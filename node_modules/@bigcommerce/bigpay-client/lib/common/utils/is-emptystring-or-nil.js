"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmptyStringOrNil;

var _isEmptyString = _interopRequireDefault(require("./is-empty-string"));

var _isNil = _interopRequireDefault(require("./is-nil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {*} value
 * @returns {boolean}
 */
function isEmptyStringOrNil(value) {
  return (0, _isEmptyString.default)(value) || (0, _isNil.default)(value);
}
//# sourceMappingURL=is-emptystring-or-nil.js.map