var EDITOR_HEARTBEAT = 'editor_heartbeat';
var HEARTBEAT_INTERVAL = 3000;

exports.postAceInit = function() {
  setInterval(_triggerEditorHeartbeat, HEARTBEAT_INTERVAL)
}

var _triggerEditorHeartbeat = function() {
  var message = {
    type: EDITOR_HEARTBEAT,
    timestamp: Date.now()
  };

  _triggerEvent(message);
}

var _triggerEvent = function _triggerEvent(message) {
  // if there's a wrapper to Etherpad, send data to it; otherwise use Etherpad own window
  var target = window.parent ? window.parent : window;
  target.postMessage(message, '*');
}
