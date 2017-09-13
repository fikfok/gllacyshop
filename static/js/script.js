'use strict';

window.main = (function () {
  var body = document.querySelector('body');
  var btnFeedbackOpen = body.querySelector('.feedback-btn');
  var feedback = body.querySelector('.feedback');
  var btnFeedbackClose = feedback.querySelector('.feedback-form-close-btn');

  var header = body.querySelector('.main-header');
  var headerRightSide = header.querySelector('.navigation-right-side');
  var authorizeForm = headerRightSide.querySelector('.navigation-right-menu-authorize');
  var authorizeDialog = headerRightSide.querySelector('.authorize-form');

  var slider = body.querySelector('.slider');
  var rdbSlider1 = slider.querySelector('#slider-button-1');
  var rdbSlider2 = slider.querySelector('#slider-button-2');
  var rdbSlider3 = slider.querySelector('#slider-button-3');

  var utils = window.utils;

  var SERVER_URL = 'admin/users';
  var TIMEOUT = 15000;
  var RESPONSE_TYPE = 'json';


  /**
   * Открываю окно обратной связи
   * @return {function} - функция, которую надо выполнить
   */
  var openFeedback = function () {
    return utils.doOpen(feedback);
  };

  /**
   * Закрываю окно обратной связи
   * @return {function} - функция, которую надо выполнить
   */
  var closeFeedback = function () {
    return utils.doClose(feedback);
  };

  /**
   * Открытие диалогового окна для авторизации
   * @param {object} evt - данные о событии
   */
  var openAuthDialog = function (evt) {
    if (!evt.target.closest('.user_is_authenticated')) {
      utils.doOpen(authorizeDialog);
      authorizeForm.addEventListener('mouseleave', closeAuthDialogLeaveFormHandler);
      authorizeDialog.addEventListener('mouseleave', closeAuthDialogLeaveDialogHandler);
    }
  };

  /**
   * Закрытие диалогового окна для авторизации при уходе с формы
   */
  var closeAuthDialogLeaveFormHandler = function () {
    if (!document.activeElement.closest('.authorize-form')) {
      closeAuthDialog();
    }
    authorizeForm.removeEventListener('mouseleave', closeAuthDialogLeaveFormHandler);
  };

  /**
   * Закрытие диалогового окна для авторизации при уходе с диалогового окна
   * @param {object} evt - данные о событии
   */
  var closeAuthDialogLeaveDialogHandler = function (evt) {
    if (!evt.target.closest('.authorize-form')) {
      closeAuthDialog();
    }
    authorizeDialog.removeEventListener('mouseleave', closeAuthDialogLeaveDialogHandler);
  };

  /**
   * Открываю окно авторизации
   * @return {function} - функция, которую надо выполнить
   */
  var closeAuthDialog = function () {
    return utils.doClose(authorizeDialog);
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


  btnFeedbackOpen.addEventListener('click', utils.eventHandler(openFeedback));
  btnFeedbackClose.addEventListener('click', utils.eventHandler(closeFeedback));
  document.addEventListener('keydown', utils.escPressHandler(closeFeedback));
  document.addEventListener('keydown', utils.escPressHandler(closeAuthDialog));
  document.addEventListener('click', utils.eventHandler(closeAuthDialogByClick));


  rdbSlider1.addEventListener('click', function (evt) {
    body.classList.remove('body-background-2');
    body.classList.remove('body-background-3');
    body.classList.add('body-background-1');
  });
  rdbSlider2.addEventListener('click', function (evt) {
    body.classList.remove('body-background-1');
    body.classList.remove('body-background-3');
    body.classList.add('body-background-2');
  });
  rdbSlider3.addEventListener('click', function (evt) {
    body.classList.remove('body-background-1');
    body.classList.remove('body-background-2');
    body.classList.add('body-background-3');
  });

  authorizeForm.addEventListener('mouseenter', utils.eventHandler(openAuthDialog));
  authorizeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    console.log('submit');
    window.backend.ajax(
        'GET',
        RESPONSE_TYPE,
        SERVER_URL,
        TIMEOUT,
        function() {
          console.log('OK')
        },
        function() {
          console.log('ERROR')
        },
        null
    );
  });

})();
