'use strict';

(function () {
  var COUNT_OFFERS = 8;
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPinsListElement = document.querySelector('.map__pins');

  var renderOffers = function (offersArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_OFFERS; i++) {
      var offerElement = mapPinTemplate.cloneNode(true);
      var offerImg = offerElement.querySelector('img');
      offerElement.style = 'left: ' + offersArray[i].location.x + 'px; top: ' + offersArray[i].location.y + 'px;';
      offerImg.src = offersArray[i].author.avatar;
      offerImg.alt = offersArray[i].offer.title;
      fragment.appendChild(offerElement);
    }
    mapPinsListElement.appendChild(fragment);
    window.util.hideError();
  };

  var showError = function (error) {
    window.util.showError(error);
  };

  var generateOffers = function () {
    window.backend.load(renderOffers, showError);
  };

  window.offers = {
    generate: generateOffers
  };
})();
