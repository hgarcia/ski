module.exports = function (app) {
  app.get("/music", list);
  app.get("/admin/music", app.security.authorize({errRedirect: '/admin/login' }), list);
  app.post("/admin/music", app.security.authorize({errRedirect: '/admin/login' }), save);
  app.delete("/admin/music", app.security.authorize({errRedirect: '/admin/login' }), remove);
};

function list(req, res) {

}

function save(req, res) {

}

function remove(req, res) {

}
