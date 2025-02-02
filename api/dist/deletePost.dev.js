"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handler;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _db = require("../utils/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Your connection utility
// Define the schema for the post
var postSchema = new _mongoose["default"].Schema({
  message: String,
  timestamp: Date,
  username: String,
  sessionId: String
}); // Create the model for posts

var Post = _mongoose["default"].model('Post', postSchema); // Serverless API handler for handling different request types


function handler(req, res) {
  var _req$body, postId, username, sessionId, post;

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
          _req$body = req.body, postId = _req$body.postId, username = _req$body.username, sessionId = _req$body.sessionId; // Check that the required fields are present

          if (!(!postId || !username || !sessionId)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Missing required fields: postId, username, sessionId'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(Post.findById(postId));

        case 9:
          post = _context.sent;

          if (post) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'Post not found'
          }));

        case 12:
          if (!(post.username !== username)) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(403).json({
            message: 'You can only delete your own posts'
          }));

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(post.deleteOne());

        case 16:
          res.status(200).json({
            message: 'Post deleted successfully'
          });
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Error deleting post',
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
//# sourceMappingURL=deletePost.dev.js.map
