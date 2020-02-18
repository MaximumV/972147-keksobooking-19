'use strict';

(function () {
  var mapMainPinElement = document.querySelector('.map__pin--main');

  var activateApp = function () {
    window.map.enableMap();
    window.addForm.enableFormAdd();
  };

  var deactivateApp = function () {
    window.map.disableMap();
    window.addForm.disableFormAdd();
  };

  var onClickPinElement = function () {
    activateApp();
    mapMainPinElement.removeEventListener('click', onClickPinElement);
  };

  var init = function () {
    deactivateApp();
    mapMainPinElement.addEventListener('click', onClickPinElement);
  };

  init();
})();
