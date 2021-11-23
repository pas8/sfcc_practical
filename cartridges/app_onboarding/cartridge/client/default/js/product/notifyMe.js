'use strict';







var get$Dialog = () => $('#notifyMeDialog')

$('.select-size').on('change', (__) => {
  __.preventDefault()
  var notifyMeDialog = get$Dialog()
  notifyMeDialog.show()
  notifyMeDialog.addClass('show')

  document.querySelector('.modal-background').style.display = 'block'

});

[...document.querySelector('.select-size').children].forEach(el => {
  var url = el.getAttribute('value')

  $.ajax({
    url: url,
    type: 'get',
    success: (data) => {
      !data.product.available && el.setAttribute('disabled', '')

    }
  })

});



var setSuccessNotifyMeMessage = (parent) => {
  var submitButton = parent.querySelector('#notifyMeDialogSubmitButton')

  submitButton.style.display = 'none'
  var closeButtonHtml = '<button id="closeNotifyMeDialogButton" class="btn  btn-primary "> Close </button>'
  submitButton.insertAdjacentHTML('afterend', closeButtonHtml)

  var closeButton = $('#closeNotifyMeDialogButton')


  var dialogBody = parent.querySelector('.modal-body').children[0]
  dialogBody.insertAdjacentHTML('afterend', '<div> Email will send when product will be available </div>')

  dialogBody.style.display = 'none'

  closeButton.on('click', () => {

    var notifyMeDialog = get$Dialog()
    notifyMeDialog.hide()
    notifyMeDialog.removeClass('show')

    document.querySelector('.modal-background').style.display = 'none'

    submitButton.style.display = 'block'
    closeButton.remove()
    dialogBody.style.display = 'block'

    $(parent.querySelector('.modal-body').children[1]).remove()
  })

}

$('#notifyMeDialogForm').submit(function (e) {
  var form = $(this);
  e.preventDefault();
  var url = form.attr('action');
  form.spinner().start();

  $.ajax({
    url: url,
    type: 'post',
    data: form,
    success: (data) => {
      form.spinner().stop();

      if (data.isValid) {
        setSuccessNotifyMeMessage(this)

      } else {
        console.error(data)

      }

    }
  })
})