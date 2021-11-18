var server = require('server')


server.get('Show', function (req, res, next) {
  res.json({'fuck':'fuck'});
  next();
})


module.exports = server.exports()