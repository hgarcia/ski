var moment = require('moment');
var curl = require('curling');
var url = require('url');

exports.init = function (db) {
  var videos = db.collection('videos');
  return {
    createFromApi: function (urlString , cb) {
      var connection = curl.connect({});
      var videoUrl = url.parse(urlString);
      var self = this;
      var oEmbeddUrl;
      var video_url = videoUrl.href;
      if (videoUrl.host.indexOf('vimeo') !== -1) {
        oEmbeddUrl = "http://vimeo.com/api/oembed.json?url=" + video_url;
      } else {
        if (videoUrl.host.indexOf("youtu.be/") === -1) {
          video_url = "http://youtu.be/" + videoUrl.query.split('=')[1];
        }
        oEmbeddUrl = "http://www.youtube.com/oembed?url=" + video_url;
      }
      try {
        connection.get(oEmbeddUrl, {}, function (err, result) {
          if (result.payload) {
            var dto = JSON.parse(result.payload);
            dto.video_url = video_url;
            dto.thumbnail_url = dto.thumbnail_url.replace('hqdefault', 'mqdefault');
            self.create(dto, cb);
          }
        });
      } catch (parseE) {
        cb(parseE, null);
      }
    },
    update: function (dto, cb) {
      if (!dto.title ||
          !dto.video_url ||
          !dto.thumbnail_url ||
          !dto.author_name ||
          !dto.author_url) {
        return cb(new Error("All fields are mandatory."), dto);
      }
      videos.findById(dto._id, modifyAndSave);
      function modifyAndSave(err, video) {
        video.title = dto.title;
        video.video_url = dto.video_url;
        video.thumbnail_url = dto.thumbnail_url;
        video.author_name = dto.author_name;
        video.author_url = dto.author_url;
        video.description = dto.description;
        videos.save(video, {safe: true}, cb);
      }
    },
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
