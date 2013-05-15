var categs = require('../../models/categories');

module.exports = function (app) {
  app.get("/videos", htmlView);
  app.get("/videos/:id/:provider/:title", htmlView);
  app.get("/videos.json", rotation);
  app.get("/admin/videos", app.security.authorize(), list);
  app.get("/admin/videos/:id", app.security.authorize(), single);
  app.post("/admin/videos/:id", app.security.authorize(), save);
  app.delete("/admin/videos/:id", app.security.authorize(), remove);
};

function htmlView (req, res) {
  res.render("videos", {title: "Videos", id: req.params.id});
}

function rotation (req, res) {
  var videos = req.app.db.collection('videos');
  videos.find({}, {sort: {created: -1}}).toArray(function (err, list) {
    res.send(list);
  });
}

function list(req, res) {
  var videos = req.app.db.collection('videos');
  var series = req.app.db.collection('series');
  series.find({}, {sort: {created: 1}}).toArray(function (err, seriesList) {
    videos.find({}, {sort: {created: -1}}).toArray(function (err, list) {
      var payload = {
        title: "Video list",
        videos: list,
        series: seriesList,
        user: req.session.user,
        categories: categs.get()
      };
      res.render("admin/videos", payload);
    });
  });
}

function single(req, res) {
  var videos = req.app.db.collection('videos');
  var series = req.app.db.collection('series');
  series.find({}, {sort: {created: 1}}).toArray(function (err, seriesList) {
    videos.findById(req.params.id, function (err, video) {
      var payload = {
        title: "Edit video",
        video: video,
        series: seriesList,
        user: req.session.user,
        categories: categs.get()
      };
      res.render("admin/editVideo", payload);
    });
  });
}

function save(req, res) {
  var id = req.params.id;
  var data = req.body.video;
  var videos = require('../../models/videos').init(req.app.db);

  if (id === "0") {
    videos.createFromApi(data, sendResponse);
  } else {
    videos.update(data, sendResponse);
  }

  function sendResponse(err, video) {
    if (video) {
      res.redirect("/admin/videos");
    }
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
