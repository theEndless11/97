"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishToAbly = publishToAbly;
exports.subscribeToAbly = subscribeToAbly;

var _ably = _interopRequireDefault(require("ably"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ably = new _ably["default"].Realtime(process.env.ABLY_API_KEY); // Fetch Ably API key from environment variables

var channel = ably.channels.get('opinions'); // Use the same 'opinions' channel for all communication

/**
 * Publish a message to the Ably channel
 * @param {string} event - The event name, e.g., 'newOpinion', 'editOpinion', or 'deleteOpinion'
 * @param {Object} data - The data to send in the event
 */

function publishToAbly(event, data) {
  return new Promise(function (resolve, reject) {
    // Serialize the data if needed
    var serializedData = _objectSpread({}, data, {
      timestamp: new Date().toISOString() // Add current timestamp

    }); // Publish the event with the serialized data


    channel.publish(event, serializedData, function (err) {
      if (err) {
        console.error('Error publishing message to Ably:', err);
        reject(err);
      } else {
        console.log("Published message to Ably channel with event: ".concat(event));
        resolve();
      }
    });
  });
}
/**
 * Subscribe to an event on the Ably channel
 * @param {string} event - The event name to subscribe to
 * @param {Function} callback - The callback function to handle the event
 */


function subscribeToAbly(event, callback) {
  channel.subscribe(event, function (message) {
    console.log("Received event: ".concat(event), message);
    callback(message);
  });
}
//# sourceMappingURL=ably.dev.js.map
