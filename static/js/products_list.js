'use strict';

window.productsList = (function () {
  var productsTable = document.querySelector('.products-list-content-table');
  var deleteButtons = productsTable.querySelectorAll('.delete-product-btn');
  var deleteDialog = document.querySelector('.confirm-delete');
  var deleteDialogCloseBtn = deleteDialog.querySelector('.confirm-delete-form-close-btn');
  var deleteDialogMessage = deleteDialog.querySelector('.confirm-delete-message');
  var deleteDialogForm = deleteDialog.querySelector('form');

  var utils = window.utils;

  var closeConfirm = function () {
    deleteDialog.classList.add('hideme');
  };

  deleteButtons.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();

      deleteDialogMessage.innerText = 'Удалить товар "' + evt.target.dataset.name + '"?';
      deleteDialogForm.action = deleteDialogForm.action.toString().replace(/(\d+\/)$/, evt.target.dataset.id + '/');
      deleteDialog.classList.remove('hideme');
    });
  });


  deleteDialogCloseBtn.addEventListener('click', utils.eventHandler(closeConfirm));
  document.addEventListener('keydown', utils.escPressHandler(closeConfirm));


})();
