
module.exports = function (app) {
  app.get('/', index);
  app.get('/videos', videos);
  app.get('/articles', articles);
  app.get('/pictures', pictures);
  app.get('/music', music);
};

function index(req, res) {
  res.render('index', { title: 'The Bicho - Ski, snowboard and outdoors news and videos' });
}
function videos(req, res) {
  res.render('videos', { title: 'The Bicho - Videos', id: "-" });
}
function music(req, res) {
  res.render('music', { title: 'The Bicho - Music for your outdoor time' });
}
function articles(req, res) {
  res.render('articles', { title: 'The Bicho - News and articles' });
}
function pictures(req, res) {
  res.render('pictures', { title: 'The Bicho - Ski, snowboard and outdoor pictures' });
}
