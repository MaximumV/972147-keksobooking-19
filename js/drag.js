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
  var isActiveApp = false;

  var setPinCoors = function (pinCoors, shift, coordinate) {
    if (pinCoors[coordinate] < PossibleLocations[coordinate].MIN) {
      pinCoors[coordinate] = PossibleLocations[coordinate].MIN;
    } else if (pinCoors[coordinate] > PossibleLocations[coordinate].MAX) {
      pinCoors[coordinate] = PossibleLocations[coordinate].MAX;
    } else {
      pinCoors[coordinate] -= shift[coordinate];
    }
  };

  window.drag = function (evt) {
    var coors = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var pinCoors = {
        x: mapMainPinElement.offsetLeft,
        y: mapMainPinElement.offsetTop
      };

      var shift = {
        x: coors.x - moveEvt.clientX,
        y: coors.y - moveEvt.clientY
      };

      coors = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setPinCoors(pinCoors, shift, 'x');
      setPinCoors(pinCoors, shift, 'y');

      mapMainPinElement.style.left = (pinCoors.x) + 'px';
      mapMainPinElement.style.top = (pinCoors.y) + 'px';
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.addForm.setAddress();
      if (!isActiveApp) {
        window.app.activate();
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
