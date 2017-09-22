
'use strict';

window.auth = (function () {
  var SERVER_URL_LOGIN = '/user/login/';
  var SERVER_URL_LOGOUT = '/user/logout/';
  var TIMEOUT = 15000;
  var RESPONSE_TYPE = 'json';

  var createUserBtn = document.querySelector('#create-user');
  var createUserDialog = document.querySelector('.create-user');
  var utils = window.utils;

  /**
   * Открытие диалогового окна для авторизации
   */
  var openCreateDialog = function () {
    utils.doOpen(createUserDialog);
  };

  /**
   * Закрываю окно создания пользователся
   * @return {function} - функция, которую надо выполнить
   */
  var closeAuthDialog = function () {
    return utils.doClose(createUserDialog);
  };

  /**
   * Закрываю окно авторизации, если был клик мыши вне области диалогового окна
   * @param {object} evt - данные о событии
   * @return {*} - функция, которую надо выполнить
   */
  var closeAuthDialogByClick = function (evt) {
    var res = false;
    if (!evt.target.closest('.authorize-form') && !evt.target.closest('.navigation-right-menu-authorize')) {
      res = utils.doClose(authorizeDialog);
    }
    return res;
  };

  document.addEventListener('keydown', utils.escPressHandler(closeAuthDialog));
  document.addEventListener('click', utils.eventHandler(closeAuthDialogByClick));

  authorizeForm.addEventListener('mouseenter', utils.eventHandler(openAuthDialog));
  authorizeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var loginData = new FormData(authorizeForm);

    window.backend.ajax(
        'POST',
        RESPONSE_TYPE,
        SERVER_URL_LOGIN,
        TIMEOUT,
        function (response) {
          if (response.authorizeStatus.toLowerCase() === 'ok') {
            authorizeDialog.classList.remove('authorize-form-error');
            authorizeDialogErrorMsg.classList.add('hideme');
            userPanelInHeaderMenu.innerHTML = response.userPanel;
            authorizeForm.innerHTML = response.authPanel;
            authorizeForm.classList.add('user_is_authenticated');
            authorizeDialog.classList.add('hideme');
            logoutBtnBehaivor();
          } else {
            authorizeDialog.classList.add('authorize-form-error');
            authorizeDialogErrorMsg.classList.remove('hideme');
          }
        },
        function () {
          console.log('ERROR');
        },
        loginData
    );
  });

  var doLogout = function (evt) {
    var logoutBtn = authorizeForm.querySelector('.logout-btn');
    evt.preventDefault();

    window.backend.ajax(
        'GET',
        RESPONSE_TYPE,
        SERVER_URL_LOGOUT,
        TIMEOUT,
        function (response) {
          if (response.authorizeStatus.toLowerCase() === 'ok') {
            window.location.href = '/';
          } else {
            console.log('RESPONSE ERROR');
          }
        },
        function () {
          console.log('CONNECTION ERROR');
        },
        null
    );
    logoutBtn.removeEventListener('click', utils.eventHandler(doLogout));
  };

  var logoutBtnBehaivor = function () {
    var logoutBtn = authorizeForm.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', utils.eventHandler(doLogout));
    }
  };

  logoutBtnBehaivor();
})();
