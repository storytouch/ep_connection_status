exports.aceEditEvent = function (hook, context) {
  var pluginSettings = clientVars.plugins.plugins.ep_connection_status;

  // define delay if not defined yet
  pluginSettings.milisecondsToWaitForReconnect = pluginSettings.milisecondsToWaitForReconnect || 3000;

  suggestReconnectionIfLastEventListenedWasTooLongAgo(pluginSettings.milisecondsToWaitForReconnect);
}

var timeOfLastChange;
var suggestReconnectionIfLastEventListenedWasTooLongAgo = function(milisecondsToWaitForReconnect) {
  // setTimeout/clearTimeout does not work, the setTimeout callback is never called when client
  // is not active
  if (Date.now() - timeOfLastChange > milisecondsToWaitForReconnect) {
    // FIXME use a custom disconnect message
    pad.handleChannelStateChange('DISCONNECTED', 'slowcommit');
  }
  timeOfLastChange = Date.now();
}