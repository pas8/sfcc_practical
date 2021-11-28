'use strict';


var server = require('server')
var TRANSACTION = require('dw/system/Transaction')
var productListMgr = require('dw/customer/ProductListMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var CCompareModel = require('*/cartridge/models/ccompare');
var PCompareModel = require('*/cartridge/models/pcompare');




var getType = function () {
  return 100
}

var getList = function (currentCustomer) {
  var TYPE = getType()
  var productLists;
  TRANSACTION.wrap(function () {

    productLists = productListMgr.getProductLists(currentCustomer, TYPE)
  });

  var list = productLists && productLists.length > 0 ? productLists[0] : null;

  return list;
}

var getOrCreateList = function (currentCustomer) {

  var list = getList(currentCustomer)

  if (!!list) return list;
  var newList;

  TRANSACTION.wrap(function () {
    var TYPE = getType()
    newList = productListMgr.createProductList(currentCustomer, TYPE);
  });

  return newList
}

var addProductToCompareList = function (list, req) {
  try {

    TRANSACTION.wrap(function () {
      var pid = req.querystring.pid;
      var apiProduct = ProductMgr.getProduct(pid);
      list.createProductItem(apiProduct)

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



var getCompareProducts = function (currentCustomer) {

  var list = getList(currentCustomer)
  var collections = require('*/cartridge/scripts/util/collections');

  var productListItemsColection = list.getItems()
  var compareProducts = collections.map(productListItemsColection, function (el) {
    var apiProduct;
    TRANSACTION.wrap(function () {
      apiProduct = ProductMgr.getProduct(el.productID);

    })
    return apiProduct
  })

  return compareProducts
}

server.get('CShow', function (req, res, next) {

  var currentCustomer = req.currentCustomer.raw

  var compareProducts = getCompareProducts(currentCustomer)
  var CCM = new CCompareModel(compareProducts)


  res.render('compare/ccomparePage', CCM);
  next();
})


server.get('PShow', function (req, res, next) {

  var currentCustomer = req.currentCustomer.raw

  var compareProducts = getCompareProducts(currentCustomer)
  var PCM = new PCompareModel(req,compareProducts)


  res.render('compare/pcomparePage', PCM);
  next();
})


server.post('Add', function (req, res, next) {

  var currentCustomer = req.currentCustomer.raw
  var list = getOrCreateList(currentCustomer)

  var result = addProductToCompareList(list, req)
  res.json(result);

  next();
})





module.exports = server.exports()