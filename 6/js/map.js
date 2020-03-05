'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var formFilterElement = document.querySelector('.map__filters');
  var formFilterSelectElements = formFilterElement.querySelectorAll('select');
  var formFilterFieldsetElements = formFilterElement.querySelectorAll('fieldset');

  var enableMap = function () {
    if (mapElement.classList.contains('map--faded')) {
      window.util.enableFormElements(formFilterFieldsetElements);
      window.util.enableFormElements(formFilterSelectElements);
      window.offers.generate();
      mapElement.classList.remove('map--faded');
    }
  };

  var disableMap = function () {
    window.util.disableFormElements(formFilterFieldsetElements);
    window.util.disableFormElements(formFilterSelectElements);
    mapElement.classList.add('map--faded');
  };

  window.map = {
    enable: enableMap,
    disable: disableMap
  };
})();
