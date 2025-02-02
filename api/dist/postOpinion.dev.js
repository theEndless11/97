"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handler;

var _db = require("../utils/db");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _ably = require("../utils/ably");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Corrected path
// Corrected path
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
});

var Post = _mongoose["default"].model('Post', postSchema);

function handler(req, res) {
  var _req$body, message, username, sessionId, newPost, cleanPost;

  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.method === 'POST')) {
            _context.next = 34;
            break;
          }

          _req$body = req.body, message = _req$body.message, username = _req$body.username, sessionId = _req$body.sessionId;

          if (!(!message || message.trim() === '')) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Message cannot be empty'
          }));

        case 4:
          if (!(!username || !sessionId)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Username and sessionId are required'
          }));

        case 6:
          _context.prev = 6;
          console.log('Connecting to database...');
          _context.next = 10;
          return regeneratorRuntime.awrap((0, _db.connectToDatabase)());

        case 10:
          // Ensure this step completes
          console.log('Database connected successfully.');
          newPost = new Post({
            message: message,
            timestamp: new Date(),
            username: username,
            sessionId: sessionId
          });
          _context.next = 14;
          return regeneratorRuntime.awrap(newPost.save());

        case 14:
          console.log('New post saved:', newPost); // Publish to Ably

          _context.prev = 15;
          _context.next = 18;
          return regeneratorRuntime.awrap((0, _ably.publishToAbly)('newOpinion', newPost));

        case 18:
          console.log('Post published to Ably:', newPost);
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](15);
          console.error('Error publishing to Ably:', _context.t0);

        case 24:
          // Send only the necessary data (not the full Mongoose document)
          cleanPost = {
            _id: newPost._id,
            message: newPost.message,
            timestamp: newPost.timestamp,
            username: newPost.username,
            likes: newPost.likes,
            dislikes: newPost.dislikes,
            comments: newPost.comments
          };
          res.status(201).json(cleanPost); // Send clean post data without Mongoose metadata

          _context.next = 32;
          break;

        case 28:
          _context.prev = 28;
          _context.t1 = _context["catch"](6);
          console.error('Error saving post:', _context.t1);
          res.status(500).json({
            message: 'Error saving post',
            error: _context.t1
          });

        case 32:
          _context.next = 35;
          break;

        case 34:
          res.status(405).json({
            message: 'Method Not Allowed'
          });

        case 35:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 28], [15, 21]]);
}
//# sourceMappingURL=postOpinion.dev.js.map
