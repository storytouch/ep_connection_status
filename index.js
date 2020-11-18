var healthChecker = require('./healthChecker');

exports.expressCreateServer = function(hook_name, args, callback) {
  var thisChecker = healthChecker.init();
  args.app.get('/health', function(req, res) {
    var isHealth = thisChecker.areAllChecksFullfilled();
    if (isHealth) {
      res.json({ code: 200, health: isHealth });
    } else {
      console.log({isHealth});
    }
  });
};
