module.exports = function (app) {
  app.get("/pictures", list);
  app.get("/admin/pictures", app.security.authorize({errRedirect: '/admin/login' }), list);
  app.post("/admin/pictures", app.security.authorize({errRedirect: '/admin/login' }), save);
  app.delete("/admin/pictures", app.security.authorize({errRedirect: '/admin/login' }), remove);
};

function list(req, res) {

}

function save(req, res) {

}

function remove(req, res) {

}
