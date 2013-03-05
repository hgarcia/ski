exports.create = function (config) {
  var mongo = require('mongoskin');
  console.log(config);
  if (config.url) {
    console.log('here');
    return mongo.db(config.url + '/?autoReconnect=true', config.options);
  } else {
    return mongo.db(
                    config.uris[0] + '/' + config.options.database + '/?autoReconnect=true',
                    config.options
                  );
  }
};
