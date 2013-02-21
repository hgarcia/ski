exports.setup = function (req, res) {
  var db = req.app.db;
  var users = db.collection('users');
  users.findOne({role: "uber-admin"}, function (err, user) {
    if (!user) {
      res.render("setup", {title: "Setup admin user"});
    } else {
      res.redirect('/admin');
    }
  });
};

exports.saveSetup = function (req, res) {
  var db = req.app.db;
  var users = db.collection('users');
  var admin = {
    email: req.body.email,
    password: req.body.password,
    role: 'uber-admin'
  };
  users.save(admin, {safe: true}, function (err, result) {
    if (err) {
      res.send(err, 500);
    } else {
      res.send(204);
    }
  });
};
