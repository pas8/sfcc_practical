'use strict';

var server = require('server');


server.post('Validate', function (req, res, next) {
  try {
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Transaction = require('dw/system/Transaction');
    var collections = require('*/cartridge/scripts/util/collections');

    var notifyMeForm = server.forms.getForm('notifyMe');
    var pId = req.querystring.pid


    Transaction.wrap(function () {
      var customObject = CustomObjectMgr.getCustomObject('NotifyMeObj', pId);

      if (!customObject) {

        customObject = CustomObjectMgr.createCustomObject('NotifyMeObj', pId);
        customObject.custom.customersvalue = [notifymeFrom.email.value]
        return;
      }

      var customersArr = customObject.custom.customersvalue;
      var newCustomersArr = customersArr

      var isCustomerIncludes = collections.every(customersArr, function (customer) {
        return customer !== notifymeFrom.email.value
      })

      if (isCustomerIncludes) {
        newCustomersArr.push(notifymeFrom.email.value)
        customObject.custom.customersvalue = newCustomersArr
      }
    })

    res.json({
      isValid: notifyMeForm.valid
    })

  } catch (error) {
    res.json({
      error: error
    })
  }
  next();

})

module.exports = server.exports();