exports.init = function (db) {
  return {
    findOne: function (query, cb) {
      db.users.findOne(query, cb);
    }
  };
};
