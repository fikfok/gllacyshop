'use strict';

window.doShopping = (function () {
  var addToCartButtons = document.querySelectorAll('.to-cart');
  var countTxtBoxes = document.querySelectorAll('.product-count-to-cart');
  var utils = window.utils;

  var addProduct = function (evt) {
    evt.preventDefault();
    window.cart.addProduct(evt.target.dataset.prodId, evt.target.dataset.prodName, evt.target.closest('.hit-item').querySelector('.product-count-to-cart').value, evt.target.dataset.prodPrice, evt.target.dataset.photoSrc);
  };

  addToCartButtons.forEach(function (item) {
    item.addEventListener('click', utils.eventHandler(addProduct));
  });

  countTxtBoxes.forEach(function (item) {
    item.addEventListener('change', utils.eventHandler(utils.changeCountHandler));
  });

})();
