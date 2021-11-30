'use strict';


var server = require('server')
var TRANSACTION = require('dw/system/Transaction')
server.extend(module.superModule);

server.append('Show', function (req, res, next) {

  var userAgent = req.httpHeaders.get('user-agent')
  var isMobile = userAgent.indexOf('Mobile') !== -1

  TRANSACTION.wrap(function () {
    var custom = req.session.raw.custom
    custom.isMobile = isMobile

  })

  next()
})


module.exports = server.exports()