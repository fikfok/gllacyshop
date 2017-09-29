'use strict';

(function () {
  function Cart() {
    this.MAX_COUNT = 10;
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
      var newCount = Math.round((parseFloat(currentProd.count) + parseFloat(count)) * 10) / 10;
      if (newCount > this.MAX_COUNT) {
        newCount = this.MAX_COUNT;
      }
      currentProd.count = newCount;
      currentProd.totalPrice = Math.round((newCount * parseFloat(price)) * 10) / 10;
      localStorage.setItem(prodId, JSON.stringify(currentProd));

      this.array.forEach(function (item) {
        if (item.key === prodId) {
          item.value.count = currentProd.count;
          item.value.totalPrice = currentProd.totalPrice;
        }
      });
    }
    document.dispatchEvent(new CustomEvent('addProdIntoCart'));
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
    document.dispatchEvent(new CustomEvent('deleteProdFromCart', {'detail': prodId}));
  };

  Cart.prototype.getTotalOrderPrice = function () {
    return this.array.reduce(function (accumulator, item) {
      accumulator += +item.value.totalPrice;
      return accumulator;
    }, 0);
  };

  Cart.prototype.changeCount = function (prodId, count) {
    var currentProd = JSON.parse(localStorage.getItem(prodId));
    var newTotalPrice = 0;
    if (currentProd !== null) {
      var newCount = Math.round(parseFloat(count) * 10) / 10;
      currentProd.count = newCount;
      newTotalPrice = Math.round((newCount * parseFloat(currentProd.price)) * 10) / 10;
      currentProd.totalPrice = newTotalPrice;
      localStorage.setItem(prodId, JSON.stringify(currentProd));
    }
    this.array.forEach(function (item) {
      if (item.key.toString() === prodId.toString()) {
        item.value.count = newCount;
        item.value.totalPrice = newTotalPrice;
      }
    });
    document.dispatchEvent(new CustomEvent('changeProdInCart'));
    return newTotalPrice;
  };

  Cart.prototype.getCountAndPrice = function (prodId) {
    var currentProd = JSON.parse(localStorage.getItem(prodId));
    var count = 0;
    var totalPrice = 0;
    if (currentProd !== null) {
      count = currentProd.count;
      totalPrice = currentProd.totalPrice;
    }
    return {count: count, totalPrice: totalPrice};
  };

  var cart = new Cart();
  window.cart = cart;
})();
