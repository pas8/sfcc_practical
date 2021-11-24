module.exports = {
  setWishListLength: (length) => {
    document.querySelector('#wishlistLengthNumber').textContent = length
  },

  renderNewPageOfItems: function (pageNumber, spinner, focusElementSelector) {
    var publicView = $('.wishlistItemCardsData').data('public-view');
    var listUUID = $('.wishlistItemCardsData').data('uuid');
    var url = $('.wishlistItemCardsData').data('href');
    if (spinner) {
      $.spinner().start();
    }
    var scrollPosition = document.documentElement.scrollTop;
    var newPageNumber = pageNumber;
    $.ajax({
      url: url,
      method: 'get',
      data: {
        pageNumber: ++newPageNumber,
        publicView: publicView,
        id: listUUID
      }
    }).done(function (data) {
      $('.wishlistItemCards').empty();
      $('body .wishlistItemCards').append(data);

      if (focusElementSelector) {
        $(focusElementSelector).focus();
      } else {
        document.documentElement.scrollTop = scrollPosition;
      }
    }).fail(function () {
      $('.more-wl-items').remove();
    });
    $.spinner().stop();
  },
  displayErrorMessage: function ($elementAppendTo, msg) {
    if ($('.remove-from-wishlist-messages').length === 0) {
      $elementAppendTo.append(
        '<div class="remove-from-wishlist-messages "></div>'
      );
    }
    $('.remove-from-wishlist-messages')
      .append('<div class="remove-from-wishlist-alert text-center alert-danger">' + msg + '</div>');

    setTimeout(function () {
      $('.remove-from-wishlist-messages').remove();
    }, 3000);
  }
}