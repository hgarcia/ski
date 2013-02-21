exports.create = function (config) {
  return require('mongoskin').db(
                        config.uris[0] + '/' + config.options.database + '/?autoReconnect=true',
                        config.options
                    );
};
