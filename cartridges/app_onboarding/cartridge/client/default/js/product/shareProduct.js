'use strict';

var shareProductOpenerButton = document.getElementById('shareProductOpenerButton')

shareProductOpenerButton.addEventListener('click', () => {
    $('#shareProductModal').modal('show')

})


$('#shareProductForm').submit(function (e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
        url: url,
        type: 'post',
        data: form.serialize(),
        dataType: 'json',
        success: (data) => {
            console.log(data)

        }
    })
})