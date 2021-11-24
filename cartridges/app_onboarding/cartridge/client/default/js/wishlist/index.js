'use strict';
var removeButtonArr = document.querySelectorAll('.remove-from-wishlist')

removeButtonArr.forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();

    // var url = $(this).data('url');
    // var elMyAccount = $('.account-wishlist-item').length;
    // if (elMyAccount > 0) {
    //   $('.wishlist-account-card').spinner().start();
    //   $.ajax({
    //     url: url,
    //     type: 'get',
    //     dataType: 'html',
    //     data: {},
    //     success: function (html) {
    //       console.log(html)
    //       $('.wishlist-account-card>.card').remove();
    //       $('.wishlist-account-card').append(html);
    //       $('.wishlist-account-card').spinner().stop();
    //     },
    //     error: function () {
    //       var $elToAppend = $('.wishlist-account-card');
    //       $elToAppend.spinner().stop();
    //       var msg = $elToAppend.data('error-msg');
    //       displayErrorMessage($elToAppend, msg);
    //     }
    //   });
    // else user is in wishlist landing page, call removeProduct() end point, then remove this card
    // } else {


    // $.spinner().start();
    // $.ajax({
    //   url: url,
    //   type: 'get',
    //   dataType: 'json',
    //   data: {},
    //   success: function (data) {

    //     var pageNumber = $('.wishlistItemCardsData').data('page-number') - 1;
    //     renderNewPageOfItems(pageNumber, false);
    //     updateWishlistCount(data.count);
    //   },
    //   error: function () {
    //     $.spinner().stop();
    //     var $elToAppendWL = $('.wishlistItemCards');
    //     var msg = $elToAppendWL.data('error-msg');
    //     displayErrorMessage($elToAppendWL, msg);
    //   }
    // });
    // }

    var pId = el.getAttribute('data-pid')
    var cardClass = '.pid-' + pId
    console.log(document.querySelector(cardClass), cardClass)
    document.querySelector('#wishlistLengthNumber').textContent = 3


    document.body.insertAdjacentHTML('afterbegin',
      '<div class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0; display:none">' +
      ' <div id="restoreRemovedProduct"  role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">' +
      '    <div class="toast-header">' +
      '       Item was removed' +
      "    </div>" +
      ' <div class="toast-body">' +
      '  <button class="btn"> Restore! </button> ' +
      ' </div>' +
      ' </div>' +
      '</div>'

    )
    var toast = document.querySelector('#restoreRemovedProduct')
    // .st

    // console.log(new bootstrap.Toast)
  })
})