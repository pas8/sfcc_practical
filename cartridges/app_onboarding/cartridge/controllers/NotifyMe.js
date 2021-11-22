'use strict';

/**
 * @namespace Product
 */

var server = require('server');

server.post('Validate', function (req, res, next) {
  var notifyMeForm = server.forms.getForm('notifyMe');
  var isValid = notifyMeForm.valid
  dw.system.HookMgr.callHook('notifyMe.email', 'send', notifyMeForm.email.value);
  // if() return 
  res.json({
    isValid: isValid
  })
  // res.json('',{});
  next();
})
module.exports = server.exports();