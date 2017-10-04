'use strict';

window.doShopping = (function () {
  var METHOD = 'POST';
  var SERVER_URL_CONFIRM_ORDER = '/order/';
  var SERVER_URL_SAVE_PROFILE = '/profile/';
  var TIMEOUT = 15000;
  var RESPONSE_TYPE = 'json';

  var orderContainer = document.querySelector('.order-content');
  var csrfToken = orderContainer.querySelector('input[name="csrfmiddlewaretoken"]');
  var orderTable = orderContainer.querySelector('.order-content-table');
  var templateOrderRow = document.querySelector('#template-order-row');
  var confirmBtn = orderContainer.querySelector('.confirm-order-btn');
  var createProfileDialog = document.querySelector('.create-profile');
  var closeBtnProfileDialog = createProfileDialog.querySelector('.create-profile-form-close-btn');
  var phoneNumber = createProfileDialog.querySelector('#id_phone');
  var saveProfileBtn = createProfileDialog.querySelector('.create-profile-save-btn');
  var cartContainer = document.querySelector('.cart-content');
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

  confirmBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    var data = new FormData();

    data.append('data', JSON.stringify(window.cart.getArrayItems()));
    data.append('csrfmiddlewaretoken', csrfToken.value);

    window.backend.ajax(
        METHOD,
        RESPONSE_TYPE,
        SERVER_URL_CONFIRM_ORDER,
        TIMEOUT,
        function (response) {
          orderServerResponse(response);
        },
        function () {
          console.log('ERROR');
        },
        data
    );
  });

  /**
   * Закрываю окно создания профиля
   * @return {function} - функция, которую надо выполнить
   */
  var closeCreateProfileDialog = function () {
    return utils.doClose(createProfileDialog);
  };

  var checkPhoneNumber = function () {
    var usersPhone = phoneNumber.value.match(/^8-{0,1}\d{3}-{0,1}\d{3}-{0,1}\d{2}-{0,1}\d{2}$/i);
    var res = false;

    if (usersPhone) {
      phoneNumber.classList.remove('error-border');
      res = true;
    } else {
      phoneNumber.classList.add('error-border');
    }
    return res;
  };

  var saveProfile = function (evt) {
    evt.preventDefault();
    if (checkPhoneNumber()) {
      var profile = new FormData();

      profile.append('data', JSON.stringify({address: createProfileDialog.querySelector('.create-profile-address').value, phone: createProfileDialog.querySelector('input[name="phone"]').value}));
      profile.append('csrfmiddlewaretoken', csrfToken.value);

      window.backend.ajax(
          METHOD,
          RESPONSE_TYPE,
          SERVER_URL_SAVE_PROFILE,
          TIMEOUT,
          function (profileResponse) {
            if (profileResponse.status.toString().toLowerCase() === 'ok') {
              var data = new FormData();

              data.append('data', JSON.stringify(window.cart.getArrayItems()));
              data.append('csrfmiddlewaretoken', csrfToken.value);

              window.backend.ajax(
                  METHOD,
                  RESPONSE_TYPE,
                  SERVER_URL_CONFIRM_ORDER,
                  TIMEOUT,
                  function (orderResponse) {
                    orderServerResponse(orderResponse);
                  },
                  function () {
                    console.log('ERROR');
                  },
                  data
              );
            } else {
              console.log('ERROR');
            }
          },
          function () {
            console.log('ERROR');
          },
          profile
      );
    }
  };

  var orderCompleted = function () {
    window.cart.clearCart();
    while (orderContainer.firstChild) {
      orderContainer.removeChild(orderContainer.firstChild);
    }
    var thankYouTitle = document.createElement('p');
    thankYouTitle.classList.add('thankyou');
    thankYouTitle.innerText = 'Спасибо за заказ!';

    var thankYouMessage = document.createElement('p');
    thankYouMessage.classList.add('thankyou');
    thankYouMessage.innerText = 'Для подтверждения заказа\nнаш менеджер перезвонит Вам в ближайшее время';

    orderContainer.appendChild(thankYouTitle);
    orderContainer.appendChild(thankYouMessage);
  };

  var orderServerResponse = function (response) {
    if (response.status.toString().toLowerCase() === 'ok') {
      orderCompleted();
      closeCreateProfileDialog();
    } else if (response.status.toString().toLowerCase() === 'no_address') {
      createProfileDialog.classList.remove('hideme');
    } else if (response.status.toString().toLowerCase() === 'wrong_order') {
      console.log('WRONG_ORDER');
    }
  };

  document.addEventListener('deleteProdFromCart', utils.eventHandler(removeItemFromCart));
  document.addEventListener('changeProdInCart', utils.eventHandler(changeItemInCart));
  document.addEventListener('keydown', utils.escPressHandler(closeCreateProfileDialog));
  closeBtnProfileDialog.addEventListener('click', utils.eventHandler(closeCreateProfileDialog));
  phoneNumber.addEventListener('blur', utils.eventHandler(checkPhoneNumber));
  saveProfileBtn.addEventListener('click', utils.eventHandler(saveProfile));
  showOrderContent();
})();
