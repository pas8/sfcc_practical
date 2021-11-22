'use strict';




$('.select-size').on('change', (__) => {
  __.preventDefault()
  var notifyMeDialog = $('#notifyMeDialog')
  notifyMeDialog.show()
  notifyMeDialog.addClass('show')

  document.querySelector('.modal-background').style.display = 'block'


});

$('#notifyMeDialogForm').submit(function (e) {
  var form = $(this);
  e.preventDefault();
  var url = form.attr('action');
  form.spinner().start();

  $('.reset-password-form').trigger('login:register', e);
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    data: form.serialize(),
    success: function (data) {
      console.llog(data)
    }
  })
})