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

  var resetApp = function (evt) {
    if (evt) {
      evt.preventDefault();
    }
    window.addForm.reset();
    window.map.reset();
    window.map.clear();
    window.map.setPinDefault();
    deactivateApp();
  };

  init();

  window.app = {
    activate: activateApp,
    deactivate: deactivateApp,
    reset: resetApp
  };
})();
