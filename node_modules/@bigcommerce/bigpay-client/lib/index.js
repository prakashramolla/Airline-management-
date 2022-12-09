"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClient = createClient;

var _client = _interopRequireDefault(require("./client/client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} [config]
 * @returns {Client}
 */
function createClient(config) {
  return _client.default.create(config);
}
//# sourceMappingURL=index.js.map