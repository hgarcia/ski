module.exports = function (app) {
  app.get("/videos", rotation);
  app.get("/admin/videos", app.security.authorize({errRedirect: '/admin/login' }), list);
  app.get("/admin/videos/:id", app.security.authorize({errRedirect: '/admin/login' }), single);
  app.post("/admin/videos", app.security.authorize({errRedirect: '/admin/login' }), save);
  app.delete("/admin/videos", app.security.authorize({errRedirect: '/admin/login' }), remove);
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
    res.render("admin/videos", {title: "Admin video list", list: list});
  });
}

function single(req, res) {
  var videos = req.app.db.collection('videos');
  videos.findById(req.params.id, function (err, video) {
    res.render("admin/editVideo", {title: "Admin edit video", video: video});
  });
}

function save(req, res) {

}

function remove(req, res) {
  var videos = req.app.db.collection('videos');
  videos.remove(req.params.id, function (err, video) {
    res.redirect("admin/videos");
  });
}
