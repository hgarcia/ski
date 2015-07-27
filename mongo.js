exports.create = function (config) {
  var mongo = require('mongoskin');
  if (config.url) {
    return mongo.db(config.url + '/?autoReconnect=true', {w: 1});
  } else {
    return mongo.db(
      config.uris[0] + '/' + config.options.database + '/?autoReconnect=true',
      config.options
    );
  }
};
