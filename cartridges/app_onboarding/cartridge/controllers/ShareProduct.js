'use strict';

var server = require('server')

server.get('Validate',
  server.middleware.https,
  function (req, res, next) {
    var form = server.forms.getForm('share_product')
    res.json({
      success: form.valid
    })
    next()

  })

module.exports = server.exports()