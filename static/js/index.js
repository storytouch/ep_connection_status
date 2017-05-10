exports.aceEditEvent = function (hook, context) {
  // FIXME use a setting for milisecondsToWaitForReconnect
  suggestReconnectionIfLastEventListenedWasTooLongAgo(3000);
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