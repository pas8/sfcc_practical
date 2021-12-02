'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var TRANSACTION = require('dw/system/Transaction');
var File = require('dw/io/File')

module.exports = {

  fileConverter: function (COName) {
    var iterator = require('dw/util/Iterator');
    var file = File('/IMPEX/src/CustomOders.csv')



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
      file.createNewFile() 
      file = text
    })



  }
}