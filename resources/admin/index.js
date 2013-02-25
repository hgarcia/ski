var usersModel = require("../../models/users");
module.exports = function (app) {
  app.get("/admin", admin);
  app.get("/admin/login", admin);
  app.post("/admin/login",
    app.passport.authenticate('local', { failureRedirect: '/admin/login', failureFlash: true }),
    function(req, res) {
      res.redirect('/admin');
    });
  app.get("/setup", setup);
  app.post("/setup", save);
};

function admin(req, res) {
  res.render("admin", {title: "Admin area"});
}

function setup(req, res) {
  var db = req.app.db;
  var users = db.collection('users');
  users.findOne({role: "uber-admin"}, function (err, user) {
    if (!user) {
      res.render("setup", {title: "Setup admin user"});
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

  };
  users.save(admin, {safe: true}, function (err, result) {
    if (err) {
      res.send(err, 500);
    } else {
      res.send(204);
    }
  });
}
