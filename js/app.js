'use strict';

(function () {
  var mapMainPinElement = document.querySelector('.map__pin--main');

  var activateApp = function () {
    window.map.enable();
    window.addForm.enable();
  };

  var deactivateApp = function () {
    window.map.disable();
    window.addForm.disable();
  };

  var init = function () {
    deactivateApp();
    mapMainPinElement.addEventListener('mousedown', window.drag);
  };

  init();

  window.app = {
    activate: activateApp,
    deactivate: deactivateApp
  };
})();
