'use strict';

var base = require('plugin_wishlists/wishlist/wishlist');
var util= require('./utils');
var removeButtonArr = document.querySelectorAll('.remove-from-wishlist')

base.removeFromWishlist = function () {}

removeButtonArr.forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();

    var pId = el.getAttribute('data-pid')
    var url = el.getAttribute('data-url')
    var cardClass = '.pid-' + pId


    var product = document.querySelector(cardClass)
    product.style.display = 'none'



    document.body.insertAdjacentHTML('afterbegin',
      '<div class="position-fixed bottom-0 border border-primary  rounded _toast  p-2 bg-light" style="z-index: 5; right: 16px; bottom: 16px;" >' +
      ' <div class="toast-body" style="display:flex; gap:8px; align-items:center;" >' +
      '    <span> Item was removed </span> <button class="btn  btn-primary" id="restoreRemovedProduct"> Restore! </button> ' +
      ' </div>' +
      '</div>'

    )

    var toast = document.querySelector('._toast')
    var isRemoved = true

    toast.querySelector('#restoreRemovedProduct').addEventListener('click', () => {
      isRemoved = false;
      document.querySelector(cardClass).style.display = 'block';
      toast.remove()
    })


    setTimeout(() => {
      toast.remove()

      if (!isRemoved) return

      var elMyAccount = $('.account-wishlist-item').length;
      if (elMyAccount > 0) {
        $('.wishlist-account-card').spinner().start();
        $.ajax({
          url: url,
          type: 'get',
          dataType: 'html',
          data: {},
          success: function (html) {
            $('.wishlist-account-card>.card').remove();
            $('.wishlist-account-card').append(html);
            $('.wishlist-account-card').spinner().stop();
          },
          error: function () {
            var $elToAppend = $('.wishlist-account-card');
            $elToAppend.spinner().stop();
            var msg = $elToAppend.data('error-msg');
            util.displayErrorMessage($elToAppend, msg);
          }
        });
        return;
      }

      $.spinner().start();
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {

          var pageNumber = $('.wishlistItemCardsData').data('page-number') - 1;
          util.renderNewPageOfItems(pageNumber, false);
          util.setWishListLength(data.listLength);
        },
        error: function () {
          $.spinner().stop();
          var $elToAppendWL = $('.wishlistItemCards');
          var msg = $elToAppendWL.data('error-msg');
          util.displayErrorMessage($elToAppendWL, msg);
        }
      })


    }, 4000);
  })
})

module.exports = base;