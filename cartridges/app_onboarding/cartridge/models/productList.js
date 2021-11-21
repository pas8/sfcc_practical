'use strict';
var collections = require('*/cartridge/scripts/util/collections');


function getProducts(list) {
  // var productList = list.getProductList()
  var productList = list.toArray()


  return productList
}

function ProductList(list, view) {



  this.productList = getProducts(list)
}


module.exports = ProductList;