(function () {
  var menuNames = {features:'FEATURES', story:'STORY', image:'IMAGE', board:'BOARD', faq:'FAQ', dispel_bu_image:'IMAGE', dispel_bu_board:'BOARD', dispel_bu_faq:'FAQ'};
  window.addEventListener('error', function (event) {
    var img = event.target;
    if (!img || img.tagName !== 'IMG' || !img.parentNode) return;
    if (menuNames[img.name]) {
      var label = document.createElement('span');
      label.textContent = menuNames[img.name];
      img.replaceWith(label);
    } else {
      img.style.display = 'none';
    }
  }, true);
}());
