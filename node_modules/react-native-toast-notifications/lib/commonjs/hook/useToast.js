"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _context = _interopRequireDefault(require("./context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useToast = () => (0, _react.useContext)(_context.default);

var _default = useToast;
exports.default = _default;
//# sourceMappingURL=useToast.js.map