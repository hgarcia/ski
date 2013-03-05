exports.create = function (config) {
  var mongo = require('mongoskin');
  if (config.url) {
    return mongo.db(config.url + '/?autoReconnect=true');
  } else {
    return mongo.db(
                    config.uris[0] + '/' + config.options.database + '/?autoReconnect=true',
                    config.options
                  );
  }
};


//mongodb://heroku:6244d1162c7b50d5e30fc2b903c0472e@linus.mongohq.com:10018/app12644392
