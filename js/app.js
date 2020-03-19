'use strict';

(function () {
  var mapMainPinElement = document.querySelector('.map__pin--main');

  var activateApp = function () {
    window.addForm.enable();
    window.map.enable();
  };

  var deactivateApp = function () {
    window.addForm.disable();
    window.map.disable();
  };

  var onMainPinMousedown = function (evt) {
    window.drag(evt);
  };

  var onMainPinClick = function () {
    window.addForm.setAddress();
    window.app.activate();
  };

  var init = function () {
    deactivateApp();
    mapMainPinElement.addEventListener('mousedown', onMainPinMousedown);
    mapMainPinElement.addEventListener('click', onMainPinClick);
  };

  var resetApp = function (evt) {
    if (evt) {
      evt.preventDefault();
    }
    window.map.clear();
    window.map.setPinDefault();
    window.addForm.reset();
    window.filter.clear();
    deactivateApp();
  };

  init();

  window.app = {
    activate: activateApp,
    deactivate: deactivateApp,
    reset: resetApp
  };
})();
