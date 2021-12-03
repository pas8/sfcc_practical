'use strict';

var TRANSACTION = require('dw/system/Transaction');
var File = require('dw/io/File')
var FileWriter = require('dw/io/FileWriter')

module.exports = {

  ordersUploader: function (hashMap) {
    var fileName = hashMap.FileName || '__CustomOders.csv'
    var iterator = require('dw/util/Iterator');
    var file = File('/IMPEX/src/' + fileName)


    TRANSACTION.wrap(function () {
      var OrderMgr = require('dw/order/OrderMgr');

      var seekableIterator = require('dw/util/SeekableIterator');
      seekableIterator = OrderMgr.queryOrders("", "creationDate ASC", null)

      var headKeys = ['orderId', 'name', 'email', 'productCount', 'totalPrice']
      var columns = ''

      while (seekableIterator.hasNext()) {
        var order = seekableIterator.next();
        var orderItem = order.getOrderItem(null)

        var strArr = [
          // orderItem.getItemID(),
          order.getOrderNo(),
          order.getCustomerName(),
          order.getCustomerEmail(),
          order.getAllProductLineItems().length,
          order.getTotalGrossPrice().value
        ]

        columns += strArr + '\n'
      }
      var text = headKeys + '\n' + columns;
      file.createNewFile()

      writer = FileWriter(file);
      writer.write(text);
      writer.close();
    })

  }
}




