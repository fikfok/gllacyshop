'use strict';

(function () {
  function Cart() {
    this.index = 0;
  }

  Cart.prototype.addProduct = function (prodId, ProdName, count, price, photoSrc) {
    var currentProd = JSON.parse(localStorage.getItem(prodId));
    var oldCount = 0;

    if (currentProd === null) {
      localStorage.setItem(prodId, JSON.stringify({'name': ProdName, 'count': count, 'price': price, 'photoSrc': photoSrc}));
    } else {
      // oldCount = Math.round(parseFloat(currentProd.count), 1);
      currentProd.count = Math.round((+currentProd.count + +parseFloat(count)) * 10) / 10;
      localStorage.setItem(prodId, JSON.stringify(currentProd));
    }
  };

  Cart.prototype.getItemsCount = function () {
    return localStorage.length;
  };

  Cart.prototype.next = function () {
    if (this.index >= localStorage.length) {
      this.index = 0;
    }
    var res = localStorage.getItem(localStorage.key(this.index));
    this.index++;
    return res;
  };

  Cart.prototype.getArrayItems = function () {
    var array = [];
    for (var i = 0; i < localStorage.length; i++) {
      array.push({key: localStorage.key(i), value: JSON.parse(localStorage.getItem(localStorage.key(i)))});
    }
    return array;
  };

  Cart.prototype.deleteItem = function (prodId) {
    localStorage.removeItem(prodId);
  };

  window.Cart = Cart;
})();
