var editorEvent = require('ep_webpack/editorEventEmitter').editorEvent;
var webpackShared = require('ep_webpack/shared');

/*
here we declare all the checks needed to consider the editor service as
healthy. From now, we only need to wait for webpack to create the bundle files
*/
var health_check = { webpack_is_ready: false };

var WEBPACK_FILES_GENERATED_EVENT = webpackShared.WEBPACK_FILES_GENERATED_EVENT;

var healthChecker = function() {
  this._listenToHealthCheckEvents();
};

healthChecker.prototype._listenToHealthCheckEvents = function() {
  var self = this;
  editorEvent.on(WEBPACK_FILES_GENERATED_EVENT, function() {
    self.changeCheckerValue('webpack_is_ready', true);
  });
};

healthChecker.prototype.changeCheckerValue = function(key, value) {
  health_check[key] = value;
};

healthChecker.prototype.areAllChecksFullfilled = function(key, value) {
  var checkValues = Object.values(health_check);
  return !checkValues.includes(false);
};

exports.init = function() {
  return new healthChecker();
};
