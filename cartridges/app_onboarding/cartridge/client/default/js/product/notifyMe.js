'use strict';




$('.select-size').on('change', function (e) {
  e.preventDefault()
  var notifyMeDialog = $('#notifyMeDialog')
  notifyMeDialog.show()
  notifyMeDialog.addClass('show')
  
  document.querySelector('.modal-background').style.display = 'block'

});