'use strict';

(function () {
  var PossibleLocations = {
    x: {
      MIN: 0 - window.data.OffsetPins.main.x,
      MAX: 1135 + window.data.OffsetPins.main.x
    },
    y: {
      MIN: 130 - window.data.OffsetPins.main.y,
      MAX: 630 - window.data.OffsetPins.main.y
    }
  };
  var mapMainPinElement = document.querySelector('.map__pin--main');

  var setPinCoordinates = function (pinCoordinates, shift, coordinate) {
    if (pinCoordinates[coordinate] < PossibleLocations[coordinate].MIN) {
      pinCoordinates[coordinate] = PossibleLocations[coordinate].MIN;
    } else if (pinCoordinates[coordinate] > PossibleLocations[coordinate].MAX) {
      pinCoordinates[coordinate] = PossibleLocations[coordinate].MAX;
    } else {
      pinCoordinates[coordinate] -= shift[coordinate];
    }
  };

  window.drag = function (evt) {
    var coordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var pinCoordinates = {
        x: mapMainPinElement.offsetLeft,
        y: mapMainPinElement.offsetTop
      };

      var shift = {
        x: coordinates.x - moveEvt.clientX,
        y: coordinates.y - moveEvt.clientY
      };

      coordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setPinCoordinates(pinCoordinates, shift, 'x');
      setPinCoordinates(pinCoordinates, shift, 'y');

      mapMainPinElement.style.left = (pinCoordinates.x) + 'px';
      mapMainPinElement.style.top = (pinCoordinates.y) + 'px';
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.addForm.setAddress();
      window.app.activate();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
