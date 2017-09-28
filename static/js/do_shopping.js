'use strict';

window.doShopping = (function () {
  var rightMenuCart = document.querySelector('.navigation-right-menu-cart');
  var utils = window.utils;
  var cart = new window.Cart();
  var cartBtn = rightMenuCart.querySelector('#cart-btn');
  var cartContainer = rightMenuCart.querySelector('.cart-content');
  var cartTable = cartContainer.querySelector('.cart-content-table');
  var templateCartRow = document.querySelector('#template-cart-row');

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
    rightMenuCart.querySelector('.cart-total-price').innerText = 'Итого: ' + cart.getTotalOrderPrice() + ' руб.';
  };

  var refreshCartBlock = function () {

    console.log(cart.getArrayItems())


    while (cartTable.firstChild) {
      cartTable.removeChild(cartTable.firstChild);
    }

    cart.getArrayItems().forEach(
        function (item) {
          var newRow = templateCartRow.cloneNode(true).content;
          newRow.querySelector('.cart-delete-item').dataset.prodId = item.key;
          newRow.querySelector('.cart-icon-item').src = newRow.querySelector('.cart-icon-item').getAttribute('src') + item.value.photoSrc;
          newRow.querySelector('.item-in-cart').innerText = item.value.name;
          newRow.querySelector('.item-in-cart-weight').innerText = item.value.count + ' кг х ';
          newRow.querySelector('.item-in-cart-price').innerText = item.value.price + ' руб.';
          newRow.querySelector('.item-in-cart-total').innerText = item.value.totalPrice + ' руб.';
          cartTable.appendChild(newRow);
        }
    );
    cartTable.querySelectorAll('.cart-delete-item').forEach(function (item) {
      item.addEventListener('click', utils.eventHandler(removeItemFromCart));
    });

  };

  var removeItemFromCart = function (evt) {
    if (Object.prototype.toString.call(evt) === '[object MouseEvent]') {
      evt.preventDefault();
      cart.deleteItem(evt.target.dataset.prodId);
      if (cart.getItemsCount() === 0) {
        closeCartContent();
      }
      evt.target.closest('.cart-table-row').remove();
    } else if (Object.prototype.toString.call(evt) === '[object CustomEvent]') {
      var buttonToClick = cartTable.querySelector('button[data-prod-id="' + evt.detail + '"]');

      if (buttonToClick) {
        buttonToClick.closest('.cart-table-row').remove();
      }
    }
    renderCartTitle();
  };

  var openCartContent = function () {
    if (cart.getItemsCount() > 0) {
      utils.doOpen(cartContainer);
    }
  };

  var closeCartContent = function () {
    utils.doClose(cartContainer);
  };

  rightMenuCart.addEventListener('mouseenter', utils.eventHandler(openCartContent));
  rightMenuCart.addEventListener('mouseleave', utils.eventHandler(closeCartContent));

  renderCartTitle();
  refreshCartBlock();
  document.addEventListener('deleteProdFromCart', utils.eventHandler(removeItemFromCart));
  document.addEventListener('addProdIntoCart', function () {

    console.log('FIRE!!!!')

    renderCartTitle();
    refreshCartBlock();
  });

})();
