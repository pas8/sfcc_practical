'use strict';


var server = require('server');

server.post('Validate', function (req, res, next) {
  var notifyMeForm = server.forms.getForm('notifyMe');
  var isValid = notifyMeForm.valid

  dw.system.HookMgr.callHook('notifyMe.email', 'send', notifyMeForm.email.value);
  res.json({
    isValid: isValid
  })

  next();
})

module.exports = server.exports();