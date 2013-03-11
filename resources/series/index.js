module.exports = function (app) {
  app.get("/admin/series", app.security.authorize(), list);
  app.get("/admin/series/:id", app.security.authorize(), single);
  app.post("/admin/series/:id", app.security.authorize(), save);
  app.delete("/admin/series/:id", app.security.authorize(), remove);
};

function list(req, res) {
  var series = req.app.db.collection('series');
  series.find({}, {sort: {created: -1}}).toArray(function (err, list) {
    res.render("admin/series", {title: "Admin series list", series: list, user: req.session.user});
  });
}

function single(req, res) {
  var series = req.app.db.collection('series');
  series.findById(req.params.id, function (err, serie) {
    res.render("admin/editSerie", {title: "Admin edit serie", serie: serie, user: req.session.user});
  });
}

function save(req, res) {
  var id = req.params.id;
  var series = req.app.db.collection('series');
  var dto = {
    name: req.body.name
  };
  if (id === "0") {
    series.save(dto ,function (err, serie) {
      if (serie) {
        res.redirect("/admin/series");
      }
    });
  } else {
    series.findById(id, function (err, serie) {
      serie.name = req.body.name;
      series.save(serie, {safe: true},function (err, saved) {
        if (saved) {
          res.redirect("/admin/series");
        }
      });
    });
  }
}

function remove(req, res) {
  var series = req.app.db.collection('series');
  series.removeById(req.params.id, function (err, serie) {
    if (err) {
      res.send(err, 500);
    } else {
      res.send(204);
    }
  });
}
