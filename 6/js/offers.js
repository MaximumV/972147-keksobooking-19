'use strict';

(function () {
  var COUNT_OFFERS = 8;
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var offerPopupTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var mapPinsListElement = document.querySelector('.map__pins');

  var renderPins = function (offersArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_OFFERS; i++) {
      var pinElement = mapPinTemplate.cloneNode(true);
      var offerElement = offerPopupTemplate.cloneNode(true);
      var pinImg = pinElement.querySelector('img');
      var offerImagesElement = offerElement.querySelector('.popup__photos');
      var offerImgTemplate = offerImagesElement.querySelector('.popup__photo').cloneNode(true);
      pinElement.style = 'left: ' + offersArray[i].location.x + 'px; top: ' + offersArray[i].location.y + 'px;';
      pinImg.src = offersArray[i].author.avatar;
      pinImg.alt = offersArray[i].offer.title;
      offerElement.querySelector('.popup__title')
        .textContent = offersArray[i].offer.title;
      offerElement.querySelector('.popup__text--address')
        .textContent = offersArray[i].offer.address;
      offerElement.querySelector('.popup__text--price')
        .textContent = offersArray[i].offer.price + '₽/ночь';
      offerElement.querySelector('.popup__type')
        .textContent = window.data.HouseTypes[offersArray[i].offer.type];
      offerElement.querySelector('.popup__text--capacity')
        .textContent = offersArray[i].offer.rooms + ' комнаты для ' + offersArray[i].offer.guests + ' гостей';
      offerElement.querySelector('.popup__text--time')
        .textContent = 'Заезд после ' + offersArray[i].offer.checkin + ' выезд до ' + offersArray[i].offer.checkout;
      offerElement.querySelector('.popup__features')
        .textContent = offersArray[i].offer.features.join(', ');
      offerElement.querySelector('.popup__description')
        .textContent = offersArray[i].offer.description;
      offerImagesElement.removeChild(offerImagesElement.querySelector('.popup__photo'));
      offersArray[i].offer.photos.forEach(function (item) {
        var offerImg = offerImgTemplate.cloneNode(true);
        offerImg.src = item;
        offerImagesElement.appendChild(offerImg);
      });
      offerElement.querySelector('.popup__avatar')
        .src = offersArray[i].author.avatar;
      fragment.appendChild(offerElement);
      fragment.appendChild(pinElement);
    }
    mapPinsListElement.appendChild(fragment);
    window.util.hideError();
  };

  var showError = function (error) {
    window.util.showError(error);
  };

  var generateOffers = function () {
    window.backend.load(renderPins, showError);
  };

  window.offers = {
    generate: generateOffers
  };
})();
