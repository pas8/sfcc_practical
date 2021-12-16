'use strict';

var base = module.superModule;

function productsListItem(productsListItemObj) {
  base.call(this, productsListItemObj);
  if (!productsListItemObj) return;

  this.productListItem.daysLeft = ~~daysLeft;
}

function getList(customer, config) {
  var productListMgr = require('dw/customer/ProductListMgr');
  var Site = require('dw/system/Site');
  var TRANSACTION = require('dw/system/Transaction');

  var type = config.type;
  var list;
  if (type === 10) {
    var productLists = productListMgr.getProductLists(customer, type);
    if (productLists.length === 0) return null;

    var ONE_DAY_MS = 24 * 60 * 60 * 1000;
    var WISLIST_EXPIRATION_DATE = +Site.current.getCustomPreferenceValue('expirationDaysOfwishlist');

    var validatedList = [];

    productLists[0].forEach((product) => {
      var LAST_MODIFIED_DATE = (Date.now() - productsListItemObj.lastModified.getTime()) / ONE_DAY_MS;
      var daysLeft = WISLIST_EXPIRATION_DATE - LAST_MODIFIED_DATE;
      if (daysLeft > 0) return validatedList.push(product);

      TRANSACTION.wrap(function () {
        product.list.removeItem(productsListItemObj);
      });
    });

    list = validatedList;
  } else if (type === 11) {
    list = productListMgr.getProductList(config.id);
  } else {
    list = null;
  }
  return list;
}

productsListItem.getList = getList;
module.exports = productsListItem;
