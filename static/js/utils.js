'use strict';

// Модуль, который создает данные
window.utils = (function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;

  /**
   * Обработчик события
   * @param {function} callback - callback-функция
   * @return {*} - iife функция, запускающая callback функцию
   */
  var eventHandler = function (callback) {
    if (!checkCallback(callback)) {
      return false;
    }
    return function (evt) {
      callback(evt);
    };
  };

  /**
   * Обработчик события нажатия Enter
   * @param {function} callback - callback-функция
   * @return {*} - iife функция, запускающая callback функцию
   */
  var enterPressHandler = function (callback) {
    if (!checkCallback(callback)) {
      return false;
    }
    return function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        callback(evt);
      }
    };
  };

  /**
   * Обработчик события нажатия Esc
   * @param {function} callback - callback-функция
   * @return {*} - iife функция, запускающая callback функцию
   */
  var escPressHandler = function (callback) {
    if (!checkCallback(callback)) {
      return false;
    }

    return function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        callback(evt);
      }
    };
  };

  /**
   * Проверка callback на тип: функция или нет
   * @param {function} callback - функция, которую надо проверить
   * @return {boolean} - результат: true - функция, иначе false
   */
  var checkCallback = function (callback) {
    var res = false;
    if (typeof callback !== 'function') {
      throw new Error(callback + ' не функция');
    } else {
      res = true;
    }
    return res;
  };

  /**
   * Функция реализующая задержку для устранения частого нажатия: невыполняет предыдущий вызов функции, если
   * с предыдущего до повторного вызова прошло менее DEBOUNCE_INTERVAL мс.
   * @param {function} callback - функция, которую надо выполнить
   */
  var debounce = function (callback) {
    if (checkCallback(callback)) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
    }
  };

  /**
   * Функция прячет элемет
   * @param {object} element - блок, который надо спрятать
   */
  var doClose = function (element) {
    element.classList.add('hideme');
  };

  /**
   * Функция показывает элемет
   * @param {object} element - блок, который надо показать
   */
  var doOpen = function (element) {
    element.classList.remove('hideme');
  };


  return {
    eventHandler: eventHandler,
    enterPressHandler: enterPressHandler,
    escPressHandler: escPressHandler,
    checkCallback: checkCallback,
    debounce: debounce,
    doClose: doClose,
    doOpen: doOpen
  };
})();
