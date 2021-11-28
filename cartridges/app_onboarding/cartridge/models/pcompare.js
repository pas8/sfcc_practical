'use strict';


var collections = require('*/cartridge/scripts/util/collections');


var generateID = function () {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10) + Date.now()
}


var makeArrayUniq = function (arrArg) {
  return arrArg.filter(function (elem, pos, arr) {
    return arr.indexOf(elem) == pos;
  });
};



function CompareModel(req, compareProducts) {

  var compareObj = {
    products: []
  }

  makeArrayUniq(compareProducts).forEach(function (product) {
    collections.forEach(product.categories, (function (category) {

      var isExists = category.getID() === req.querystring.categoryId
      if (!isExists) return;
      return compareObj.products.push(product)
    }))

  })

  var pValues = {

    brand: [],
    price: []
  }

  var cProducts = compareObj.products.map(function (product) {
    var priceModel = product.getPriceModel()

    pValues.brand.push(product.getBrand())
    pValues.price.push(priceModel.getPrice())

    var result = {
      name: product.getName(),
      id: generateID(),
      image: product.getImage('medium').URL.toString(),
      productId: product.getID(),
    }


    return result
  })

  this.cProducts = cProducts
  this.pValues = pValues
this.pKeys = Object.keys(pValues)

}


module.exports = CompareModel