'use strict';


var server = require('server')

server.extend(module.superModule)

server.prepend('PlaceOrder', function (req, res, next) {
  var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
  var TRANSACTION = require('dw/system/Transaction')
  var BasketMgr = require('dw/order/BasketMgr');
  var CustomObjectMgr = require('dw/object/CustomObjectMgr');

  TRANSACTION.wrap(function () {
    var CO  = CustomObjectMgr.createCustomObject('CustomOrder', order.orderNo)
    CO.custom.productCount = currentBasket.allProductLineItems.length
    CO.custom.email = currentBasket.customerEmail
    CO.custom.firstAndLastName = currentBasket.customerName || currentBasket.customerEmail
    CO.custom.totalPrice = order.totalGrossPrice.value
  })
  next()
})



module.exports = server.exports()