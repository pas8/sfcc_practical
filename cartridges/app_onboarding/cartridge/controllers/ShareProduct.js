'use strict';

var server = require('server')

server.post('Validate',
  server.middleware.https,
  function (req, res, next) {
    var form = server.forms.getForm('share_product')

    if (form.valid) {

      var TRANSACTION = require('dw/system/Transaction');

      try {
        TRANSACTION.wrap(function () {
      var HookMgr = require('dw/system/HookMgr')
          HookMgr.call('shareProduct.email', 'send', {
            email: form.email.htmlValue,
            previewTitle: form.previewTitle.htmlValue,
            PID: req.querystring.pid
          })
        })

      } catch (error) {
        var f = error
        res.json({
          error:error,
          success: false
        })
      }

    } else {
      res.json({
        success: false
      })

    }



    next()

  })

module.exports = server.exports()