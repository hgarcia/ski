var usersModel = require("../../models/users");

module.exports = function (app) {
  app.get("/admin", app.security.authorize({errRedirect: '/admin/login' }), admin);
  app.get("/admin/login", login);
  app.post("/admin/login", app.security.authenticate({successRedirect: "/admin"}));
  app.get("/setup", setup);
  app.post("/setup", save);
};

function login(req, res) {
  res.render("admin/login", {title: "Admin area"});
}

function admin(req, res) {
  res.render("admin/admin", {title: "Admin area"});
}

function setup(req, res) {
  var db = req.app.db;
  var users = db.collection('users');
  users.findOne({role: "uber-admin"}, function (err, user) {
    if (!user) {
      res.render("admin/setup", {title: "Setup admin user", err: ""});
    } else {
      res.redirect('/admin');
    }
  });
}

function save(req, res) {
  var users = usersModel.init(req.app.db);
  var dto = {
    email: req.body.email,
    password: req.body.password,
    role: 'uber-admin'
  };
  users.create(dto, sendResponse);
  function sendResponse(err, result) {
    if (err) {
      res.render("admin/setup", {title: "Setup admin user", err: err.message});
    } else if (result) {
      res.redirect("/admin");
    }
  };
}
