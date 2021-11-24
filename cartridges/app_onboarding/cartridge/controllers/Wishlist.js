'use strict'

var server = require('server')
var productListHelper = require('*/cartridge/scripts/productList/productListHelpers');

var superMobule = module.superModule

server.extend(superMobule)

server.append('RemoveProduct', function (req, res, next) {
  var viewData = res.getViewData()

  var currentcustomer = req.currentCustomer.raw
  var list = productListHelper.getList(currentcustomer, {
    type: 10
  })
  var listLength = list && list.items && list.items.length
  viewData.listLength = listLength || 0


  res.setViewData(viewData);
  next();
})


module.exports = server.exports()