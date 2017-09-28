'use strict';

window.doShopping = (function () {
  var orderContainer = document.querySelector('.order-content');
  var orderTable = orderContainer.querySelector('.order-content-table');
  var templateOrderRow = document.querySelector('#template-order-row');
  var cart = new window.Cart();
  var utils = window.utils;

  var showOrderContent = function () {

    cart.getArrayItems().forEach(
        function (item) {
          var newRow = templateOrderRow.cloneNode(true).content;
          newRow.querySelector('.red-btn').dataset.prodId = item.key;
          newRow.querySelector('.order-icon-item').src = newRow.querySelector('.order-icon-item').getAttribute('src') + item.value.photoSrc;
          newRow.querySelector('.item-in-order').innerText = item.value.name;
          newRow.querySelector('.product-count-confirm').value = item.value.count;
          newRow.querySelector('.item-in-order-price').innerText = item.value.price + ' руб.';
          newRow.querySelector('.item-in-order-total').innerText = item.value.totalPrice + ' руб.';
          orderTable.appendChild(newRow);
        }
    );
    orderTable.querySelectorAll('.order-delete-item').forEach(function (item) {
      item.addEventListener('click', utils.eventHandler(removeItemFromCart));
    });

  };

  var removeItemFromCart = function (evt) {
    if (Object.prototype.toString.call(evt) === '[object MouseEvent]') {
      evt.preventDefault();
      cart.deleteItem(evt.target.dataset.prodId);
      evt.target.closest('.order-table-row').remove();
    } else if (Object.prototype.toString.call(evt) === '[object CustomEvent]') {
      var buttonToClick = orderTable.querySelector('a[data-prod-id="' + evt.detail + '"]');
      if (buttonToClick) {
        buttonToClick.closest('.order-table-row').remove();
      }
    }
  };

  document.addEventListener('deleteProdFromCart', utils.eventHandler(removeItemFromCart));

  showOrderContent();
})();
