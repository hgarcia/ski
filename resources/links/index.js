module.exports = function (app) {
  app.get("/links", list);
  app.get("/admin/links", app.security.authorize({errRedirect: '/admin/login' }), list);
  app.post("/admin/links", app.security.authorize({errRedirect: '/admin/login' }), save);
  app.delete("/admin/links", app.security.authorize({errRedirect: '/admin/login' }), remove);
};

function list(req, res) {
  res.render("links", {title: "Links"});
}

function save(req, res) {

}

function remove(req, res) {

}
