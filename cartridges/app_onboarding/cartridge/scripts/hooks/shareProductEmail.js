'use strict';

exports.send = function (params) {
  var customerEmail = params.email
  var HashMap = require('dw/util/HashMap');
  var Mail = require('dw/net/Mail');
  var Resource = require('dw/web/Resource');
  var Site = require('dw/system/Site');
  var Template = require('dw/util/Template');
  var ProductMgr = require('dw/catalog/ProductMgr');

  var context = new HashMap();
  var email = new Mail();
  var product = ProductMgr.getProduct(params.PID)

  var imageURL = product.getImage('medium').getURL()
  var content = '<div>' +
    '<h1>' + product.getName() + '</h1>'
  '<img src="' + imageURL + '" />'
  '' +
  '</div>'


  email.addTo(customerEmail);
  email.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail'));
  email.setSubject(params.previewTitle);
  email.setContent(content);
  email.send();
}