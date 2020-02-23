'use strict';

(function () {
  var OFFERS_URL = 'https://js.dump.academy/keksobooking/data';
  var SUCCESS_CODE = 200;
  var REQUEST_TIMEOUT = 7000;
  var XHR_RESPONSE_TYPE = 'json';
  var onXhrLoad = function (status, text) {
    switch (status) {
      case SUCCESS_CODE:
        return {
          error: false,
          msg: ''
        };
      case 301:
        return {
          error: true,
          msg: 'Запрашиваемый ресурс был перемещен на другой адрес. Пожалуйста, свяжитесь с администратором сайта'
        };
      case 400:
        return {
          error: true,
          msg: 'Произошла ошибка в запросе. Пожалуйста сообщите об этом администратору'
        };
      case 403:
        return {
          error: true,
          msg: 'Недостаточно прав для выполнения запроса. Пожалуйста убедитесь в том, что вы должны иметь сюда доступ'
        };
      case 404:
        return {
          error: true,
          msg: 'Запрашиваемый ресурс не найден. Пожалуйста, сообщите об этом администратору'
        };
      case 500:
        return {
          error: true,
          msg: 'Произошла внутренняя ошибка сервера. Попробуйте повторить попытку позднееу'
        };
      default:
        return {
          error: true,
          msg: 'Произошла непредвиденная ошибка: ' + status + ' ' + text + ' Пожалуйста сообщите об этом администратору'
        };
    }
  };
  var onXhrError = function () {
    return 'Не удалось связаться с сервером, проверьте состояние интернета и повторите попытку';
  };
  var onXhrTimeout = function () {
    return 'Не удалось выполнить запрос за ' + REQUEST_TIMEOUT / 1000 + 'секунд. Проверьте скорость соединения';
  };
  var xhrHandle = function (method, url, onError, onLoad, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = XHR_RESPONSE_TYPE;
    xhr.timeout = REQUEST_TIMEOUT;
    xhr.addEventListener('load', function () {
      var result = onXhrLoad(xhr.status, xhr.statusText);
      if (result.error) {
        onError(result.msg);
      } else {
        onLoad(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError(onXhrError());
    });

    xhr.addEventListener('timeout', function () {
      onError(onXhrTimeout());
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  var loadData = function (onLoad, onError) {
    xhrHandle('GET', OFFERS_URL, onError, onLoad);
  };

  window.backend = {
    load: loadData
  };
})();
