'use strict';

window.doShopping = (function () {
  var orderContainer = document.querySelector('.order-content');
  var orderTable = orderContainer.querySelector('.order-content-table');
  var templateOrderRow = document.querySelector('#template-order-row');
  var cartContainer = document.querySelector('.cart-content');
  var confirmBtn = orderContainer.querySelector('.confirm-order-btn');
  var cartTable = cartContainer.querySelector('.cart-content-table');
  var utils = window.utils;

  var showOrderFooter = function () {
    if (window.cart.getItemsCount() > 0) {
      orderContainer.querySelector('.order-total-price').innerText = 'Итого: ' + window.cart.getTotalOrderPrice() + ' руб.';
    } else {
      orderContainer.querySelector('.order-total-price').innerText = 'Корзина пуста';
      orderContainer.querySelector('.order-total-price').style.textAlign = 'center';
      confirmBtn.classList.add('hideme');
    }
  };

  var showOrderContent = function () {
    window.cart.getArrayItems().forEach(
        function (item) {
          var newRow = templateOrderRow.cloneNode(true).content;
          newRow.querySelector('.red-btn').dataset.prodId = item.key;
          newRow.querySelector('.order-icon-item').src = newRow.querySelector('.order-icon-item').getAttribute('src') + item.value.photoSrc;
          newRow.querySelector('.item-in-order').innerText = item.value.name;
          newRow.querySelector('.product-count-confirm').value = item.value.count;
          newRow.querySelector('.product-count-confirm').dataset.prodId = item.key;
          newRow.querySelector('.item-in-order-price').innerText = item.value.price + ' руб.';
          newRow.querySelector('.item-in-order-total').innerText = item.value.totalPrice + ' руб.';
          orderTable.appendChild(newRow);
        }
    );
    orderTable.querySelectorAll('.order-delete-item').forEach(function (item) {
      item.addEventListener('click', utils.eventHandler(removeItemFromCart));
    });
    orderTable.querySelectorAll('.product-count-confirm').forEach(function (item) {
      item.addEventListener('change', utils.eventHandler(utils.changeCountHandler));
      utils.synchronizeFields('input', item, item.closest('.order-table-row').querySelector('.item-in-order-total'), synchronizePrice);
      utils.synchronizeFields('blur', item, item.closest('.order-table-row').querySelector('.item-in-order-total'), synchronizePrice);
      utils.synchronizeFields('blur', item, item, synchronizeCart);
    });
    showOrderFooter();
  };

  var removeItemFromCart = function (evt) {
    if (Object.prototype.toString. call(evt) === '[object MouseEvent]') {
      evt.preventDefault();
      window.cart.deleteItem(evt.target.dataset.prodId);
      evt.target.closest('.order-table-row').remove();
    } else if (Object.prototype.toString.call(evt) === '[object CustomEvent]') {
      var buttonToClick = orderTable.querySelector('a[data-prod-id="' + evt.detail + '"]');
      if (buttonToClick) {
        buttonToClick.closest('.order-table-row').remove();
      }
    }
    showOrderFooter();
  };

  var changeItemInCart = function () {
    var cartRow = null;
    window.cart.getArrayItems().forEach(
        function (item) {
          var countAndPrice = window.cart.getCountAndPrice(item.key);
          cartRow = cartTable.querySelector('button[data-prod-id="' + item.key + '"]').closest('.cart-table-row');
          cartRow.querySelector('.item-in-cart-weight').innerText = countAndPrice.count + ' кг х ';
          cartRow.querySelector('.item-in-cart-total').innerText = countAndPrice.totalPrice + ' руб.';
        });
    cartContainer.querySelector('.cart-total-price').innerText = 'Итого: ' + window.cart.getTotalOrderPrice() + ' руб.';
    orderContainer.querySelector('.order-total-price').innerText = 'Итого: ' + window.cart.getTotalOrderPrice() + ' руб.';
  };

  var synchronizePrice = function (masterElement, slaveElement) {
    var newPrice = window.cart.changeCount(masterElement.dataset.prodId, masterElement.value);
    slaveElement.innerText = ((!newPrice) ? 0 : newPrice) + ' руб.';
  };

  var synchronizeCart = function (masterElement, slaveElement) {
    var newPrice = window.cart.changeCount(masterElement.dataset.prodId, masterElement.value);
    slaveElement.innerText = newPrice + ' руб.';
  };

  document.addEventListener('deleteProdFromCart', utils.eventHandler(removeItemFromCart));
  document.addEventListener('changeProdInCart', utils.eventHandler(changeItemInCart));

  confirmBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    var data = new FormData();
    data.append('data', window.cart.getArrayItems());
    data.append('csrfmiddlewaretoken', orderContainer.querySelector('input[name="csrfmiddlewaretoken"]').value);

    window.backend.ajax(
        'POST',
        'json',
        '/order/',
        10000,
        function (response) {
          console.log('OK');
        },
        function () {
          console.log('ERROR');
        },
        data
      );
  });

  showOrderContent();
})();
