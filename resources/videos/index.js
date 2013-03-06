var curl = require('curling');

module.exports = function (app) {
  app.get("/videos", rotation);
  app.get("/admin/videos", app.security.authorize(), list);
  app.get("/admin/videos/:id", app.security.authorize(), single);
  app.post("/admin/videos/:id", app.security.authorize(), save);
  app.delete("/admin/videos", app.security.authorize(), remove);
};

function rotation (req, res) {
  var videos = req.app.db.collection('videos');
  videos.find({}, {sort: {created: -1}}).toArray(function (err, list) {
    res.render("videos", {title: "Videos", list: list});
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
  var videoUrl = req.body.url;
  var url;
  var videos = require('../../models/videos').init(req.app.db);
  if (id === "0") {
    if (videoUrl.indexOf('vimeo') !== -1) {
      url = "http://vimeo.com/api/oembed.json?url=" + videoUrl;
    } else {
      url = "http://www.youtube.com/oembed?url=" + videoUrl;
    }
    connection.get(url, {}, function (err, result) {
      if (result.payload) {
        var dto = JSON.parse(result.payload);
        dto.video_url = videoUrl;
        videos.create(dto, function (err, video) {
          res.redirect("/admin/videos");
        });
      }
    });
  } else {

  }
}

function remove(req, res) {
  var videos = req.app.db.collection('videos');
  videos.remove(req.params.id, function (err, video) {
    res.redirect("admin/videos");
  });
}
