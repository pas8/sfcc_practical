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

            document.body.insertAdjacentHTML('afterbegin',
                '<div class="position-fixed bottom-0 border border-primary  rounded toast  p-2 bg-light" style="z-index: 5; right: 16px; bottom: 16px;" >' +
                ' <div class="toast-body" style="display:flex; gap:8px; align-items:center;" >' +
                '    <span> ' + (data.success ? 'Shared product was send' : 'Something went wrong') + ' </span> ' +
                ' </div>' +
                '</div>'

            )

            setTimeout(() => {
                document.querySelector('.toast').remove()
            }, 4000);

        },
        complete: () => {
            $('#shareProductModal').modal('hide')

        }

    })

})