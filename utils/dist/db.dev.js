"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToDatabase = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectToDatabase = function connectToDatabase() {
  return regeneratorRuntime.async(function connectToDatabase$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!_mongoose["default"].connections[0].readyState) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return");

        case 2:
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_mongoose["default"].connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 5:
          console.log('MongoDB connected');
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          console.error('Error connecting to MongoDB:', _context.t0);
          throw new Error('MongoDB connection failed');

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 8]]);
};

exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=db.dev.js.map
