'use strict'


var base = module.superModule

function productsListItem(productsListItemObj) {

  var Site = require('dw/system/Site')
  var TRANSACTION = require('dw/system/Transaction')

  base.call(this, productsListItemObj)
  if (!productsListItemObj) return;

  var ONE_DAY_MS = 24 * 60 * 60 * 1000
  var LAST_MODIFIED_DATE = (Date.now() - productsListItemObj.lastModified.getTime()) / ONE_DAY_MS

  var WISLIST_EXPIRATION_DATE = +(Site.current.getCustomPreferenceValue('expirationDaysOfwishlist'))

  var daysLeft = WISLIST_EXPIRATION_DATE - LAST_MODIFIED_DATE

  if (daysLeft < 0) {
    TRANSACTION.wrap(function () { productsListItemObj.list.removeItem(productsListItemObj) })
    this.productsListItem = null
    return;
  }

  this.productListItem.daysLeft = ~~daysLeft
}

module.exports = productsListItem