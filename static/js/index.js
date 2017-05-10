// Consider client inactive when there's no activity for 2 minutes.
// This cannot be too short, otherwise a fresh (no cache) opening of
// a pad will trigger the reconnect event.
var DEFAULT_TIME_TO_WAIT_FOR_RECONNECT = 120000;

exports.aceEditEvent = function (hook, context) {
  var pluginSettings = clientVars.plugins.plugins.ep_connection_status;

  // define time limit if not defined yet
  pluginSettings.milisecondsToWaitForReconnect = pluginSettings.milisecondsToWaitForReconnect || DEFAULT_TIME_TO_WAIT_FOR_RECONNECT;

  suggestReconnectionIfLastEventListenedWasTooLongAgo(pluginSettings.milisecondsToWaitForReconnect);
}

var timeOfLastChange;
var suggestReconnectionIfLastEventListenedWasTooLongAgo = function(milisecondsToWaitForReconnect) {
  // setTimeout/clearTimeout does not work, the setTimeout callback is never called when client
  // is not active
  if (Date.now() - timeOfLastChange > milisecondsToWaitForReconnect) {
    // TODO use a custom disconnect message. Need to change Etherpad code to allow this
    pad.handleChannelStateChange('DISCONNECTED', 'slowcommit');
  }
  timeOfLastChange = Date.now();
}