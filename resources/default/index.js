
module.exports = function (app) {
  app.get('/', index);
  app.get('/videos', videos);
  app.get('/links', links);
  app.get('/pictures', pictures);
  app.get('/music', music);
};

function index(req, res) {
  res.render('index', { title: 'Dynamic Ski' });
}
function videos(req, res) {
  res.render('videos', { title: 'Dynamic Ski' });
}
function music(req, res) {
  res.render('music', { title: 'Dynamic Ski' });
}
exports.links = function links(req, res) {
  res.render('links', { title: 'Dynamic Ski' });
}
function pictures(req, res) {
  res.render('pictures', { title: 'Dynamic Ski' });
}
