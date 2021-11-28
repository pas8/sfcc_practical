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



function CompareModel(compareProducts) {
  var URLUtils = require('dw/web/URLUtils');

  var compareArr = []
  makeArrayUniq(compareProducts).forEach(function (product) {
    collections.forEach(product.categories, (function (category) {
      var currentCategory = compareArr.filter(function (__) {
        return category.getID() === __.categoryId
      })
      var isEmpty = currentCategory.length === 0

      if (isEmpty) return compareArr.push({
        categoryId: category.getID(),
        url: URLUtils.url('Compare-PShow').toString() + '?categoryId=' + category.getID(),
        categoryDisplayName: category.displayName,
      })
      return;
    }))

  })

  this.compareArr = compareArr

}


module.exports = CompareModel