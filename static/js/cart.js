'use strict';

(function () {
  function Cart() {
    this.array = [];
    for (var i = 0; i < localStorage.length; i++) {
      this.array.push({key: localStorage.key(i), value: JSON.parse(localStorage.getItem(localStorage.key(i)))});
    }
  }

  Cart.prototype.addProduct = function (prodId, ProdName, count, price, photoSrc) {
    var currentProd = JSON.parse(localStorage.getItem(prodId));
    var totalPrice = 0;

    if (currentProd === null) {
      totalPrice = Math.round((parseFloat(count) * parseFloat(price)) * 10) / 10;
      localStorage.setItem(prodId, JSON.stringify({'name': ProdName, 'count': count, 'price': price, 'totalPrice': totalPrice, 'photoSrc': photoSrc}));
      this.array.push({key: prodId, value: {'name': ProdName, 'count': count, 'price': price, 'totalPrice': totalPrice, 'photoSrc': photoSrc}});
    } else {
      currentProd.count = Math.round((parseFloat(currentProd.count) + parseFloat(count)) * 10) / 10;
      currentProd.totalPrice = Math.round((currentProd.count * parseFloat(price)) * 10) / 10;
      localStorage.setItem(prodId, JSON.stringify(currentProd));

      this.array.forEach(function (item) {
        if (item.key === prodId) {
          item.value.count = currentProd.count;
          item.value.totalPrice = currentProd.totalPrice;
        }
      });
    }
  };

  Cart.prototype.getItemsCount = function () {
    return localStorage.length;
  };

  Cart.prototype.getArrayItems = function () {
    return this.array;
  };

  Cart.prototype.deleteItem = function (prodId) {
    var indexToRemove = this.array.reduce(function (accumulator, item, index) {
      if (accumulator === -1) {
        accumulator = item.key.toString() === prodId.toString() ? index : -1;
      }
      return accumulator;
    }, -1);
    this.array.splice(indexToRemove, 1);
    localStorage.removeItem(prodId);
  };

  Cart.prototype.getTotalOrderPrice = function () {
    return this.array.reduce(function (accumulator, item) {
      accumulator += +item.value.totalPrice;
      return accumulator;
    }, 0);
  };

  window.Cart = Cart;
})();
