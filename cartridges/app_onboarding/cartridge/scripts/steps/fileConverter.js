'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var TRANSACTION = require('dw/system/Transaction');
var File = require('dw/io/File')

module.exports = {

  fileConverter: function (COName) {
    var iterator = require('dw/util/Iterator');
    var file = File('/IMPEX/src/src/CustomOders.xml')
    var zipedFile = file.renameTo('CO.xml')
    TRANSACTION.wrap(function () {

      var iterator = require('dw/util/Iterator');
      iterator = CustomObjectMgr.getAllCustomObjects(COName);

      while (iterator.hasNext()) {
        var customObject = iterator.next();
        TRANSACTION.wrap(function () {
          // var j = File.createNewFile()
          // var 

        });
      }


    })




  }
}