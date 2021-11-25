'use strict';


var server = require('server')
var TRANSACTION = require('dw/system/Transaction')
var productListMgr = require('dw/customer/ProductListMgr');

server.get('Show', function (req, res, next) {
  var productListMgr = require('dw/customer/ProductListMgr');


  var pId = req.pId
  var currentCustomer = req.currentCustomer.raw
  var list;
  TRANSACTION.wrap(function () {
    list = productListMgr.getProductList()
  })

  res.json({
    list: list
  });
  next();
})



var getType = function () {
  return 100
}

var getList = function (currentCustomer) {
  var TYPE = getType()
  var productLists = productListMgr.getProductLists(currentCustomer, TYPE)
  var list = productLists.length > 0 ? productLists[0] : null;

  return

}
var getOrCreateList = function (currentCustomer) {

  var productLists = productListMgr.getProductLists(currentCustomer, TYPE)
  var list = productLists.length > 0 ? productLists[0] : null;

  if (!!list) return list;
  var newList;

  Transaction.wrap(function () {
    var TYPE = getType()
    newList = ProductListMgr.createProductList(currentCustomer, TYPE);
  });

  return newList
}

var addProductToCompareList = function (list, pid) {
  try {
    TRANSACTION.wrap(function () {
      var product = ProductFactory.get(pId)

      list.createProductItem(product)
    })
    return {
      result: 'success'
    }
  } catch (error) {
    return {
      result: error
    }
  }
}


server.post('Add', function (req, res, next) {
  var ProductFactory = require('*/cartridge/scripts/factories/product');

  var currentCustomer = req.currentCustomer.raw
  var list = getOrCreateList(currentCustomer)
  var pId = req.pId

  var result = addProductToCompareList(list, pId)

  res.json(result);

  next();
})





module.exports = server.exports()