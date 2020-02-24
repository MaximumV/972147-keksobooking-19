'use strict';

(function () {
  var errorElement = document.createElement('div');
  window.util = {
    showError: function (error) {
      errorElement.style.position = 'absolute';
      errorElement.style.left = '0';
      errorElement.style.right = '0';
      errorElement.style = 'padding: 8px 0; z-index: 5; text-align: center; background-color: red; color: white';
      errorElement.style.fontSize = '15px';
      errorElement.textContent = error;
      errorElement.style.display = 'block';
      document.body.insertAdjacentElement('afterbegin', errorElement);
    },
    hideError: function () {
      errorElement.style.display = 'none';
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
