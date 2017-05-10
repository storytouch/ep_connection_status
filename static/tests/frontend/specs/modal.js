describe('ep_connection_status - inactive client modal', function() {
  var MODAL_SELECTOR = '#connectivity .slowcommit';
  var padWasReloaded = false;

  before(function(done) {
    helper.newPad(function() {
      var $padFrame = $('#iframe-container iframe');
      $padFrame.one('load', function() {
        padWasReloaded = true;
      });

      // use a very short reconnect timeout, so tests won't have to wait too long for it
      helper.padChrome$.window.clientVars.automaticReconnectionTimeout = 2;

      // make time short enough to have modal immediately shown
      var pluginSettings = helper.padChrome$.window.clientVars.plugins.plugins.ep_connection_status;
      pluginSettings.milisecondsToWaitForReconnect = 500;

      done();
    });

    this.timeout(60000);
  });

  it('displays a modal to automatically reconnect', function(done) {
    // wait for modal to be displayed
    var $errorMessageModal = helper.padChrome$(MODAL_SELECTOR);
    helper.waitFor(function() {
      return $errorMessageModal.is(':visible');
    }, 2000).done(done);
  });

  it('reloads the pad after some time', function(done) {
    helper.waitFor(function() {
      return padWasReloaded;
    }, 5000).done(done);

    this.timeout(5000);
  });
});
