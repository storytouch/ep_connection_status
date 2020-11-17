var editorEvent = require('ep_webpack/editorEventEmitter').editorEvent;
var webpackShared = require('ep_webpack/shared');

/*
here we declare all the checks needed to consider the editor service as
healthy. From now, we only need to wait for webpack to create the bundle files
*/
var health_check = { webpack_is_ready: false };

var WEBPACK_FILES_GENERATED_EVENT = webpackShared.WEBPACK_FILES_GENERATED_EVENT;

var checker = function() {
  this._listenToHealthCheckEvents();
};

checker.prototype._listenToHealthCheckEvents = function() {
  var self = this;
  var editorEmitter = new editorEvent().getEventEmitter();
  editorEmitter.on(WEBPACK_FILES_GENERATED_EVENT, function() {
    self.changeCheckerValue('webpack_is_ready', true);
  });
};

checker.prototype.changeCheckerValue = function(key, value) {
  health_check[key] = value;
};

checker.prototype.areAllChecksFullfilled = function(key, value) {
  var checkValues = Object.values(health_check);
  return !checkValues.includes(false);
};

exports.init = function() {
  return new checker();
};
