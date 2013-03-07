var moment = require('moment');

exports.init = function (db) {
  var videos = db.collection('videos');
  return {
    create: function (dto, cb) {
      if (!dto.description) {
        dto.description = "";
        delete dto.is_plus;
        delete dto.duration;
        delete dto.video_id;
      }
      dto.created = moment.utc();
      videos.save(dto, {safe: true}, cb);
    },
    findById: function(id, cb) {
      videos.findById(id, cb);
    },
    list: function (query, cb) {
      videos.find({}, {"sort": {"created": -1}}).toArray(cb);
    }
  };
};
