"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handler;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _db = require("../utils/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Your connection utility
var sessionExpirationTime = 60 * 60 * 1000; // 1 hour in milliseconds
// Define the schema for the post

var postSchema = new _mongoose["default"].Schema({
  message: String,
  timestamp: Date,
  username: String,
  sessionId: String // Session ID that the post is associated with

}); // Create the model for posts

var Post = _mongoose["default"].model('Post', postSchema);

function handler(req, res) {
  var currentTime, expiredPosts, result;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _db.connectToDatabase)());

        case 2:
          if (!(req.method === 'DELETE')) {
            _context.next = 25;
            break;
          }

          _context.prev = 3;
          // Get the current time
          currentTime = Date.now(); // Find all posts with expired sessions

          _context.next = 7;
          return regeneratorRuntime.awrap(Post.find({
            timestamp: {
              $lte: new Date(currentTime - sessionExpirationTime)
            }
          }));

        case 7:
          expiredPosts = _context.sent;

          if (!(expiredPosts.length > 0)) {
            _context.next = 16;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(Post.deleteMany({
            _id: {
              $in: expiredPosts.map(function (post) {
                return post._id;
              })
            }
          }));

        case 11:
          result = _context.sent;
          console.log("".concat(result.deletedCount, " expired posts deleted."));
          res.status(200).json({
            message: 'Expired posts have been deleted successfully.'
          });
          _context.next = 17;
          break;

        case 16:
          res.status(200).json({
            message: 'No expired posts found.'
          });

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](3);
          console.error('Error clearing history:', _context.t0);
          res.status(500).json({
            message: 'Error clearing history',
            error: _context.t0
          });

        case 23:
          _context.next = 26;
          break;

        case 25:
          res.status(405).json({
            message: 'Method Not Allowed'
          });

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 19]]);
}
//# sourceMappingURL=clearHistory.dev.js.map
