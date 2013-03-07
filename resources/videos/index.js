var curl = require('curling');
var url = require('url');

module.exports = function (app) {
  app.get("/videos", htmlView);
  app.get("/videos.json", rotation);
  app.get("/admin/videos", app.security.authorize(), list);
  app.get("/admin/videos/:id", app.security.authorize(), single);
  app.post("/admin/videos/:id", app.security.authorize(), save);
  app.delete("/admin/videos/:id", app.security.authorize(), remove);
};

function htmlView (req, res) {
  res.render("videos", {title: "Videos"});
}

function rotation (req, res) {
  var videos = req.app.db.collection('videos');
  videos.find({}, {sort: {created: -1}}).toArray(function (err, list) {
    res.send(list);
  });
}

function list(req, res) {
  var videos = req.app.db.collection('videos');
  videos.find({}, {sort: {created: -1}}).toArray(function (err, list) {
    res.render("admin/videos", {title: "Admin video list", videos: list, user: req.session.user});
  });
}

function single(req, res) {
  var videos = req.app.db.collection('videos');
  videos.findById(req.params.id, function (err, video) {
    res.render("admin/editVideo", {title: "Admin edit video", video: video, user: req.session.user});
  });
}

function save(req, res) {
  var connection = curl.connect({});
  var id = req.params.id;
  var videoUrl = url.parse(req.body.url);
  var oEmbeddUrl;
  var videos = require('../../models/videos').init(req.app.db);
  var video_url = videoUrl.href;

  if (id === "0") {
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
          videos.create(dto, function (err, video) {
            res.redirect("/admin/videos");
          });
        }
      });
    } catch (parseE) {
      console.log('Error parsing response', parseE);
    }
  } else {

  }
}

function remove(req, res) {
  var videos = req.app.db.collection('videos');
  videos.removeById(req.params.id, function (err, video) {
    if (err) {
      res.send(err, 500);
    } else {
      res.send(204);
    }
  });
}
