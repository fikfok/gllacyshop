'use strict';

(function () {
  function Cart() {}

  Cart.prototype.addProduct = function (prodId, ProdName, count, price) {
    var currentProd = JSON.parse(localStorage.getItem(prodId));
    var oldCount = 0;

    if (currentProd === null) {
      localStorage.setItem(prodId, JSON.stringify({'name': ProdName, 'count': count, 'price': price}));
    } else {
      oldCount = parseInt(currentProd.count, 10);
      currentProd.count = oldCount + parseInt(count, 10);
      localStorage.setItem(prodId, JSON.stringify(currentProd));
    }
  };

  Cart.prototype.getItemsCount = function () {
    return localStorage.length;
  };

  window.Cart = Cart;
})();
