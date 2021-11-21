'use strict';

var ProductFactory = require('*/cartridge/scripts/factories/product');
var productListMgr = require('dw/customer/ProductListMgr');

function getList(currentCustomer, mgrProps) {
  var type = mgrProps.type
  var list = productListMgr.getProductLists(currentCustomer, type)
  return list
}


function createProductList(currentCustomer, mgrProps) {
  var type = mgrProps.type
  var newProductList = productListMgr.createProductList(currentCustomer, type)
  return newProductList
}


function getCurrentOrNewList(currentCustomer, mgrProps) {

  var productList = getList(currentCustomer, mgrProps)
  if (productList) return productList
  var newProductList = createProductList(currentCustomer, mgrProps)
  return newProductList
}

function addItem(list) {
  var array = list.toArray()
  var currentList = array[0]
  var product = ProductFactory.get(pid)
  currentList.currentListcreateProductItem(product)
  return array
}

function itemExists(params) {
  return false
}


module.exports = {
  getCurrentOrNewList: getCurrentOrNewList,
  getList: getList,
  itemExists: itemExists,
  addItem: addItem
}