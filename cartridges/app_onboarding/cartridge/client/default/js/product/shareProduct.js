'use strict';

var shareProductOpenerButton = document.getElementById('shareProductOpenerButton')

shareProductOpenerButton.addEventListener('click', () => {
    $('#shareProductModal').modal('show')


})
var submitButton = document.getElementById('shareProductSubmitButton')
submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    var formID = submitButton.getAttribute('data-formid')

    var form = $('#' + formID);
    var url = form.attr('action');
    $.ajax({
        url: url + window.location.search,
        type: 'post',
        data: form.serialize(),
        dataType: 'json',
        success: (data) => {
            $('#shareProductToast').toast('show')
            // $('#shareProductToast').children().html(data.success ? 'Shared product was send' : 'Something went wrong')

        }
    })

})