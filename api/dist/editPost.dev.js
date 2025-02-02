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

var Post = _mongoose["default"].model('Post', postSchema);

function handler(req, res) {
  var _req$body, postId, username, action, comment, post;

  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, postId = _req$body.postId, username = _req$body.username, action = _req$body.action, comment = _req$body.comment;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _db.connectToDatabase)());

        case 3:
          if (!(req.method === 'POST')) {
            _context.next = 46;
            break;
          }

          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(Post.findById(postId));

        case 7:
          post = _context.sent;

          if (post) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'Post not found'
          }));

        case 10:
          if (!(action === 'like')) {
            _context.next = 19;
            break;
          }

          if (!post.dislikedBy.includes(username)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'You cannot like a post you have disliked'
          }));

        case 13:
          if (!post.likedBy.includes(username)) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'You have already liked this post'
          }));

        case 15:
          post.likes += 1;
          post.likedBy.push(username); // Add the user to the likedBy array
          // Handle the "dislike" action

          _context.next = 35;
          break;

        case 19:
          if (!(action === 'dislike')) {
            _context.next = 28;
            break;
          }

          if (!post.likedBy.includes(username)) {
            _context.next = 22;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'You cannot dislike a post you have liked'
          }));

        case 22:
          if (!post.dislikedBy.includes(username)) {
            _context.next = 24;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'You have already disliked this post'
          }));

        case 24:
          post.dislikes += 1;
          post.dislikedBy.push(username); // Add the user to the dislikedBy array
          // Handle the "comment" action

          _context.next = 35;
          break;

        case 28:
          if (!(action === 'comment')) {
            _context.next = 34;
            break;
          }

          if (!(!comment || !comment.trim())) {
            _context.next = 31;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Comment cannot be empty'
          }));

        case 31:
          post.comments.push({
            username: username,
            comment: comment,
            timestamp: new Date()
          });
          _context.next = 35;
          break;

        case 34:
          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid action type'
          }));

        case 35:
          _context.next = 37;
          return regeneratorRuntime.awrap(post.save());

        case 37:
          res.json(post);
          _context.next = 44;
          break;

        case 40:
          _context.prev = 40;
          _context.t0 = _context["catch"](4);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Error updating post',
            error: _context.t0
          });

        case 44:
          _context.next = 47;
          break;

        case 46:
          res.status(405).json({
            message: 'Method Not Allowed'
          });

        case 47:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 40]]);
}
//# sourceMappingURL=editPost.dev.js.map
