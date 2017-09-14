'use strict';

window.slider = (function () {
  var slider = document.querySelector('.slider');
  var rdbSlider1 = slider.querySelector('#slider-button-1');
  var rdbSlider2 = slider.querySelector('#slider-button-2');
  var rdbSlider3 = slider.querySelector('#slider-button-3');

  rdbSlider1.addEventListener('click', function () {
    body.classList.remove('body-background-2');
    body.classList.remove('body-background-3');
    body.classList.add('body-background-1');
  });
  rdbSlider2.addEventListener('click', function () {
    body.classList.remove('body-background-1');
    body.classList.remove('body-background-3');
    body.classList.add('body-background-2');
  });
  rdbSlider3.addEventListener('click', function () {
    body.classList.remove('body-background-1');
    body.classList.remove('body-background-2');
    body.classList.add('body-background-3');
  });
})();
