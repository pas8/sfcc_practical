'use strict';

var useRipple = function (button_node, fn, is_prevent_default = true) {
  button_node.insertAdjacentHTML('beforeend', `<span class='ripple'></span>`);

  const ripple_node = button_node.querySelector('.ripple');

  button_node.style.overflow = 'hidden';
  button_node.style.position = 'relative';

  button_node.addEventListener('click', (e) => {
    is_prevent_default && e.preventDefault();
    var x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    var y = e.clientY - e.currentTarget.getBoundingClientRect().top;

    ripple_node.style.display = 'flex';
    ripple_node.style.left = x + 'px';
    ripple_node.style.top = y + 'px';

    setTimeout(() => {
      ripple_node.style.display = 'none';
    }, 800);

    fn && fn(e);
  });
}




var compareButton = document.getElementById('add_to_compare_button')

useRipple(compareButton, function () {
  var pId = window.location.search

  var url = compareButton.getAttribute('data-url') + pId

  $.ajax({
    url: url,
    type: 'post',
    success: function (data) {
      console.log(data)
    },
    error: function (data) {
      console.log(data)
    }
  })
})