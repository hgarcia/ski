exports.setup = function (req, res) {
  var db = req.app.db;
  db.getCollectionNames(function (err, cols) {
    if (cols.length > 0) {
      db.collection('users');
      db.findOne({role: "uber-admin"}, function (err, user) {
        console.log(err);
        console.log(user);
      });
    } else {
      res.render("setup", {title: "Setup admin user"});
    }
  })
};

exports.saveSetup = function (req, res) {
  var db = req.app.db;
  db.collection('users');
  var admin = {
    email: req.body.email,
    password: req.body.password,
    role: 'uber-admin'
  };
  db.users.save(admin, function (err, result) {
    if (err) {
      res.send(500, err);
    } else {
      res.send('OK');
    }
  });
};
