'use strict';


var server = require('server')
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
  var session = require('dw/system/Session')

  var userAgent = req.httpHeaders.get('user-agent')
  var isMobile = userAgent.indexOf('Mobile') !== -1
  session.custom.isMobile = isMobile

  next()
})


module.exports = server.exports()