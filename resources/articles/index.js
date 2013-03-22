var categs = require('../../models/categories');
var _ = require("underscore");

module.exports = function (app) {
  app.get("/articles", htmlView);
  app.get("/admin/articles", app.security.authorize(), list);
  app.get("/admin/articles/:id", app.security.authorize(), single);
  app.post("/admin/articles", app.security.authorize(), save);
  app.delete("/admin/articles/:id", app.security.authorize(), remove);
};

function single(req, res) {
  var articles = req.app.db.collection('articles');
  var series = req.app.db.collection('series');
  series.find({}, {sort: {created: 1}}).toArray(function (err, seriesList) {
    var payload = {
      title: "Edit article",
      series: seriesList,
      article: {},
      user: req.session.user,
      categories: categs.get()
    };
    if (req.params.id === "0") {
      sendData(null, {title: "", serie: "", category: "", summary: "", url: "", _id: "0"})
    } else {
      articles.findById(req.params.id, sendData);
    }
    function sendData(err, article) {
      payload.article = article;
      res.render("admin/editArticle", payload);
    }
  });
}

function htmlView(req, res) {
  var articles = req.app.db.collection('articles');
  articles.find({}, {sort: {created: -1}}).toArray(function (err, list) {
    res.render("articles", {title: "Articles", articles: _.rest(list), first: list[0]});
  });
}

function list(req, res) {
  var articles = req.app.db.collection('articles');
  var series = req.app.db.collection('series');
  series.find({}, {sort: {created: 1}}).toArray(function (err, seriesList) {
    articles.find({}, {sort: {created: -1}}).toArray(function (err, list) {
      var payload = {
        title: "Article list",
        articles: list,
        series: seriesList,
        user: req.session.user,
        categories: categs.get()
      };
      res.render("admin/articles", payload);
    });
  });
}

function save(req, res) {
  var article = req.body.article;
  var articles = req.app.db.collection('articles');
  console.log(article);
  if (article._id === "0") {
    delete article._id;
  }
  articles.save(article, {safe: true}, function (err, article) {
      res.redirect("/admin/articles");
  });
}

function remove(req, res) {
  var articles = req.app.db.collection('articles');
  articles.removeById(req.params.id, function (err, article) {
    if (err) {
      res.send(err, 500);
    } else {
      res.send(204);
    }
  });
}
