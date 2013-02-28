module.exports = function (app) {
  app.get("/users", list);
  app.get("/admin/users", app.security.authorize({errRedirect: '/admin/login' }), list);
  app.post("/admin/users", app.security.authorize({errRedirect: '/admin/login' }), save);
  app.delete("/admin/users", app.security.authorize({errRedirect: '/admin/login' }), remove);
};

function list(req, res) {

}

function save(req, res) {

}

function remove(req, res) {

}
