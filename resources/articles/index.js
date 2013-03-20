var categs = require('../../models/categories');

module.exports = function (app) {
  app.get("/articles", htmlView);
  // app.get("/articles.json", rotation);
  app.get("/admin/articles", app.security.authorize({errRedirect: '/admin/login' }), list);
  app.post("/admin/articles", app.security.authorize({errRedirect: '/admin/login' }), save);
  app.delete("/admin/articles", app.security.authorize({errRedirect: '/admin/login' }), remove);
};

function htmlView(req, res) {
  var articles = req.app.db.collection('articles');
  articles.find({}, {sort: {created: -1}}).toArray(function (err, list) {
    var mainarticle = list.shift();
    res.render("articles", {title: "Articles", articles: list, mainarticle: mainarticle});
  });
}


function list(req, res) {
  var articles = req.app.db.collection('articles');
  var series = req.app.db.collection('series');
  series.find({}, {sort: {created: 1}}).toArray(function (err, seriesList) {
    articles.find({}, {sort: {created: -1}}).toArray(function (err, list) {
      var payload = {
        title: "Admin articles list",
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

}

function remove(req, res) {

}
