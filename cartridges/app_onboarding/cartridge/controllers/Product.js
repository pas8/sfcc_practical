'use strict';


var server = require('server')
var Resource = require('dw/web/Resource')
var URLUtils = require('dw/web/URLUtils');

server.extend(module.superModule)
server.append('Show', function (req, res, next) {

    var viewData = res.getViewData()

    var notifyMeForm = server.forms.getForm('notifyMe')
    var notifyMeFormActionUrl = URLUtils.url('NotifyMe-Validate').toString()


    viewData.notifyMeForm = notifyMeForm
    viewData.notifyMeFormActionUrl = notifyMeFormActionUrl
    res.setViewData(viewData)

    next();
})



module.exports = server.exports()