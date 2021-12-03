'use strict';

var server = require('server')

server.post('Validate',
  server.middleware.https,
  function (req, res, next) {
    var form = server.forms.getForm('share_product')

    if (form.valid) {

      var HookMgr = require('dw/system/HookMgr')
      var TRANSACTION = require('dw/system/Transaction');

      try {
        TRANSACTION.wrap(function () {
          HookMgr.call('shareProduct.email', {
            email: form.email.value,
            previewTitle: form.previewTitle.value,
            PID:req.querystring.pid
          })
        })

      } catch (error) {

        res.json({
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