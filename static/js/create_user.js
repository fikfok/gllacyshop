'use strict';

window.auth = (function () {
  var SERVER_URL_LOGIN = '/user/login/';
  var SERVER_URL_LOGOUT = '/user/logout/';
  var TIMEOUT = 15000;
  var RESPONSE_TYPE = 'json';

  var authorizeDialog = document.querySelector('.authorize-form');
  var createUserBtn = authorizeDialog.querySelector('#create-user');
  var createUserDialog = document.querySelector('.create-user');
  var createUserForm = createUserDialog.querySelector('.create-user-form');
  var createUserDialogCloseBtn = createUserDialog.querySelector('.create-user-form-close-btn');
  var createUserSendBtn = createUserDialog.querySelector('.create-user-send-btn');
  var utils = window.utils;

  /**
   * Открытие диалогового окна для авторизации
   * @param {object} evt - данные о событии
   */
  var openCreateDialog = function (evt) {
    evt.preventDefault();
    utils.doClose(authorizeDialog);
    return utils.doOpen(createUserDialog);
  };

  /**
   * Закрываю окно создания пользователя
   * @return {function} - функция, которую надо выполнить
   */
  var closeCreateDialog = function () {
    return utils.doClose(createUserDialog);
  };

  createUserBtn.addEventListener('click', utils.eventHandler(openCreateDialog));
  document.addEventListener('keydown', utils.escPressHandler(closeCreateDialog));
  createUserDialogCloseBtn.addEventListener('click', utils.eventHandler(closeCreateDialog));

  createUserSendBtn.addEventListener('click', function (evt) {
    evt.preventDefault();

    var loginData = new FormData(createUserForm);

    window.backend.ajax(
        'POST',
        RESPONSE_TYPE,
        '/create/user/',
        TIMEOUT,
        function (response) {
          createUserForm.innerHTML = response.html;
          console.log(response.html);
        },
        function () {
          console.log('ERROR');
        },
        loginData
    );

  });


  // createUserBtn.addEventListener('submit', function (evt) {
  //   evt.preventDefault();
  //
  //   var loginData = new FormData(authorizeForm);
  //
  //   window.backend.ajax(
  //       'POST',
  //       RESPONSE_TYPE,
  //       SERVER_URL_LOGIN,
  //       TIMEOUT,
  //       function (response) {
  //         if (response.authorizeStatus.toLowerCase() === 'ok') {
  //           authorizeDialog.classList.remove('authorize-form-error');
  //           authorizeDialogErrorMsg.classList.add('hideme');
  //           userPanelInHeaderMenu.innerHTML = response.userPanel;
  //           authorizeForm.innerHTML = response.authPanel;
  //           authorizeForm.classList.add('user_is_authenticated');
  //           authorizeDialog.classList.add('hideme');
  //           logoutBtnBehaivor();
  //         } else {
  //           authorizeDialog.classList.add('authorize-form-error');
  //           authorizeDialogErrorMsg.classList.remove('hideme');
  //         }
  //       },
  //       function () {
  //         console.log('ERROR');
  //       },
  //       loginData
  //   );
  // });


})();
