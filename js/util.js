'use strict';

window.util = (function () {
  return {
    getRandomIntFromRange: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getRandomArrayElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getArrayRandomLength: function (array) {
      return array.slice(0, window.util.getRandomIntFromRange(1, array.length + 1));
    },
    getPinCoordinates: function (pinElement, type) {
      var coorX = 0;
      var coorY = 0;
      switch (type) {
        case 'main':
          coorX = parseInt(pinElement.style.left, 10) + window.data.OffsetPins.main.x;
          coorY = parseInt(pinElement.style.top, 10) + window.data.OffsetPins.main.y;
          break;
        case 'offer':
          coorX = parseInt(pinElement.style.left, 10) + window.data.OffsetPins.offer.x;
          coorY = parseInt(pinElement.style.top, 10) + window.data.OffsetPins.offer.y;
          break;
      }
      return {
        x: coorX,
        y: coorY
      };
    },
    disableFormElements: function (nodeList) {
      for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].setAttribute('disabled', 'disabled');
      }
    },
    enableFormElements: function (nodeList) {
      for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].removeAttribute('disabled');
      }
    }
  };
})();
