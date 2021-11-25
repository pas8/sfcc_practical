'use strict'


var URLUtils = require('dw/web/URLUtils');
var server = require('server')

var superModule = module.superModule
server.extend(superModule)

server.append('Show', function (req, res, next) {

  var viewData = res.getViewData()
  var compareActionUrl = URLUtils.url('Compare-Add').toString()

  viewData.compareActionUrl = compareActionUrl

  res.setViewData(viewData)
  next()

})
module.exports = server.exports()