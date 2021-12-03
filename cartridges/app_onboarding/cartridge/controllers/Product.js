'use strict';
var server = require('server')


server.extend(module.superModule)
server.append('Show', function (req, res, next) {
  var URLUtils = require('dw/web/URLUtils')
  var viewData = res.getViewData()

  var shareProductForm = server.forms.getForm('share_product')
  shareProductForm.clear()

  var shareProductActionUrl = URLUtils.url('ShareProduct-Validate')
  viewData.shareProductActionUrl = shareProductActionUrl
  viewData.shareProductForm = shareProductForm

  res.setViewData(viewData)
  next()
})

module.exports = server.exports()