'use strict';

window.manageOrders = (function () {
  var METHOD = 'POST';
  var SERVER_URL_ORDER_COMMENT = '/ordercomment/';
  var TIMEOUT = 15000;
  var RESPONSE_TYPE = 'json';

  var addComments = document.querySelectorAll('.add-comment');
  var addCommentDialog = document.querySelector('.create-profile');
  var closeBtnProfileDialog = addCommentDialog.querySelector('.create-profile-form-close-btn');
  var addCommentDialogTitle = addCommentDialog.querySelector('.create-profile-title');
  var commentText = addCommentDialog.querySelector('#id_comment');
  var saveBtn = addCommentDialog.querySelector('.create-profile-save-btn');
  var csrfToken = addCommentDialog.querySelector('input[name="csrfmiddlewaretoken"]');
  var utils = window.utils;
  var currentOrderId = 0;
  var commentChanged = false;

  var closeAddCommentDialog = function () {
    utils.doClose(addCommentDialog);
  };

  document.addEventListener('keydown', utils.escPressHandler(closeAddCommentDialog));
  closeBtnProfileDialog.addEventListener('click', utils.eventHandler(closeAddCommentDialog));

  var changeComment = function (evt, toDo) {

    evt.preventDefault();
    if (toDo.toLowerCase() === 'do_read') {
      currentOrderId = evt.target.dataset.orderId;
    }
    addCommentDialogTitle.innerText = 'Комментарий к заказу №' + currentOrderId;

    var data = new FormData();
    var values = {orderId: currentOrderId};
    if (toDo.toLowerCase() === 'do_save') {
      values.comment = commentText.value;
    }

    data.append('data', JSON.stringify(values));
    data.append('csrfmiddlewaretoken', csrfToken.value);

    window.backend.ajax(
        METHOD,
        RESPONSE_TYPE,
        SERVER_URL_ORDER_COMMENT,
        TIMEOUT,
        function (response) {
          if (toDo.toLowerCase() === 'do_read') {
            commentText.value = response.comment;
          } else {
            document.querySelector('span[data-order-id="' + currentOrderId + '"]').innerText = commentText.value;
          }
        },
        function () {
          console.log('ERROR');
        },
        data
    );

    if (toDo.toLowerCase() === 'do_read') {
      addCommentDialog.classList.remove('hideme');
    } else {
      addCommentDialog.classList.add('hideme');
    }
  };

  addComments.forEach(function (item) {
    item.addEventListener('click', utils.eventHandler(changeComment, 'do_read'));
  });

  saveBtn.addEventListener('click', utils.eventHandler(changeComment, 'do_save'));

})();
