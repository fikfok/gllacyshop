'use strict';

window.doShopping = (function () {

  var addToCartButtons = document.querySelectorAll('.to-cart');
  var utils = window.utils;
  var cart = new window.Cart();
  var cartBtn = document.querySelector('#cart-btn');

  var addProduct = function (evt) {
    evt.preventDefault();
    cart.addProduct(evt.target.dataset.prodId, evt.target.dataset.prodName, evt.target.closest('.hit-item').querySelector('.product-count-to-cart').value, evt.target.dataset.prodPrice);
    renderCartTitle();
  };

  var switchCartClass = function (oldClass, newClass) {
    cartBtn.classList.remove(oldClass);
    cartBtn.classList.add(newClass);
  };

  var renderCartTitle = function () {
    var suffix = '';
    var title = '';
    var itemsCount = cart.getItemsCount();

    if (itemsCount === 0) {
      title = 'Пусто';
      switchCartClass('cart-btn-not-empty', 'cart-btn-empty');
    } else if (itemsCount >= 5 && itemsCount <= 20) {
      switchCartClass('cart-btn-empty', 'cart-btn-not-empty');
      title = itemsCount + ' товаров';
    } else {
      switchCartClass('cart-btn-empty', 'cart-btn-not-empty');
      switch (itemsCount.toString().slice(-1)) {
        case '1': {
          suffix = ' товар';
          break;
        }
        case '0':
        case '2':
        case '3':
        case '4': {
          suffix = ' товара';
          break;
        }
        case '5':
        case '6':
        case '7':
        case '8':
        case '9': {
          suffix = ' товаров';
          break;
        }
      }
      title = itemsCount + suffix;
    }
    cartBtn.innerText = title;
  };

  var refreshCartBlock = function () {

  };


  addToCartButtons.forEach(function (item) {
    item.addEventListener('click', utils.eventHandler(addProduct));
  }
  );

  renderCartTitle();
})();
