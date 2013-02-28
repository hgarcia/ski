var moment = require('moment');

exports.init = function (db) {
  var videos = db.collection('videos');
  return {
    create: function (dto, cb) {
      var video = {
        email: dto.email,
        created: moment.utc()
      }
      videos.save(video, {safe: true}, cb);
    },
    findById: function(id, cb) {
      videos.findById(id, cb);
    },
    list: function (query, cb) {
      videos.find({}, {"sort": {"created": -1}}).toArray(cb);
    }
  };
};
