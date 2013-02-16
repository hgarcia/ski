
/*
 * GET home page.
 */
exports.index = function (req, res) {
  res.render('index', { title: 'Dynamic Ski' });
};
exports.videos = function (req, res) {
  res.render('videos', { title: 'Dynamic Ski' });
};
exports.music = function (req, res) {
  res.render('music', { title: 'Dynamic Ski' });
};
exports.links = function (req, res) {
  res.render('links', { title: 'Dynamic Ski' });
};
exports.pictures = function (req, res) {
  res.render('pictures', { title: 'Dynamic Ski' });
};
