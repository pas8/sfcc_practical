'use strict';


var server = require('server')



server.extend(module.superModule)

server.prepend('PlaceOrder', function (req, res, next) {
  var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
  var TRANSACTION = require('dw/system/Transaction')
  var BasketMgr = require('dw/order/BasketMgr');
  var CustomObjectMgr = require('dw/object/CustomObjectMgr');



  TRANSACTION.wrap(function () {

    var iterator = require('dw/util/Iterator');
    iterator = CustomObjectMgr.getAllCustomObjects('CustomOrder');

    var headKeys = ['email', 'orderId', 'productCount', 'totalPrice']
    var columns = ''

    while (iterator.hasNext()) {
      var customObject = iterator.next();

      TRANSACTION.wrap(function () {
        var str = ''
        headKeys.forEach(function (key) {

          var coCustom = customObject.getCustom()
          var value = coCustom[key]
          str += value + ','
        })
        columns += str + '\n'
      });

    }

    var text = headKeys + '\n' + columns;
    text

  })

  // var File = require('dw/io/File')
  // var HTTPClient = require('dw/svc/HTTPService')
  // TRANSACTION.wrap(function () {
  //     HTTPClient.open('GET', 'https://aaga-020.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.servlet/webdav/Sites/Impex/src/src/CustomOders.xml');
  //     HTTPClient.setTimeout(3000);
  //     HTTPClient.send();
  //     var p = HTTPClient.text
  //   }
  // })




  // var j = File('/impex/src/src/CustomOders.xml')
  // var g = File(j).createNewFile()
  // var h = j.createNewFile()
  var currentBasket = BasketMgr.getCurrentBasket();

  var order = COHelpers.createOrder(currentBasket);

  TRANSACTION.wrap(function () {
    var CO = CustomObjectMgr.createCustomObject('CustomOrder', order.orderNo)
    CO.custom.productCount = currentBasket.allProductLineItems.length
    CO.custom.email = currentBasket.customerEmail
    CO.custom.firstAndLastName = currentBasket.customerName || currentBasket.customerEmail
    CO.custom.totalPrice = order.totalGrossPrice.value
  })
  next()
})



module.exports = server.exports()