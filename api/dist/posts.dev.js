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
  sessionId: String,
  likes: {
    type: Number,
    "default": 0
  },
  dislikes: {
    type: Number,
    "default": 0
  },
  likedBy: [String],
  // Store usernames or user IDs of users who liked the post
  dislikedBy: [String],
  // Store usernames or user IDs of users who disliked the post
  comments: [{
    username: String,
    comment: String,
    timestamp: Date
  }]
}); // Create the model for posts

var Post = _mongoose["default"].model('Post', postSchema); // Serverless API handler for getting posts


function handler(req, res) {
  var posts;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.method === 'GET')) {
            _context.next = 16;
            break;
          }

          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _db.connectToDatabase)());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(Post.find().sort({
            timestamp: -1
          }));

        case 6:
          posts = _context.sent;
          res.status(200).json(posts); // Send posts as a JSON response

          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.error("Error retrieving posts:", _context.t0);
          res.status(500).json({
            message: 'Error retrieving posts',
            error: _context.t0
          }); // Handle any errors

        case 14:
          _context.next = 17;
          break;

        case 16:
          // If the request is not a GET request, respond with 405 Method Not Allowed
          res.status(405).json({
            message: 'Method Not Allowed'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
}
//# sourceMappingURL=posts.dev.js.map
