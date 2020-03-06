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

  var getOffer = function (offerData) {
    var offerElement = offerPopupTemplate.cloneNode(true);
    var offerImagesElement = offerElement.querySelector('.popup__photos');
    var offerImgTemplate = offerImagesElement.querySelector('.popup__photo').cloneNode(true);
    offerElement.querySelector('.popup__title')
      .textContent = offerData.offer.title;
    offerElement.querySelector('.popup__text--address')
      .textContent = offerData.offer.address;
    offerElement.querySelector('.popup__text--price')
      .textContent = offerData.offer.price + '₽/ночь';
    offerElement.querySelector('.popup__type')
      .textContent = window.data.HouseTypes[offerData.offer.type];
    offerElement.querySelector('.popup__text--capacity')
      .textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
    offerElement.querySelector('.popup__text--time')
      .textContent = 'Заезд после ' + offerData.offer.checkin + ' выезд до ' + offerData.offer.checkout;
    offerElement.querySelector('.popup__features')
      .textContent = offerData.offer.features.join(', ');
    offerElement.querySelector('.popup__description')
      .textContent = offerData.offer.description;
    offerImagesElement.removeChild(offerImagesElement.querySelector('.popup__photo'));
    offerData.offer.photos.forEach(function (item) {
      var offerImg = offerImgTemplate.cloneNode(true);
      offerImg.src = item;
      offerImagesElement.appendChild(offerImg);
    });
    offerElement.querySelector('.popup__avatar')
      .src = offerData.author.avatar;
    return offerElement;
  };

  var renderOffers = function (offersArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_OFFERS; i++) {
      var pinElement = mapPinTemplate.cloneNode(true);
      var pinImg = pinElement.querySelector('img');
      pinElement.style = 'left: ' + offersArray[i].location.x + 'px; top: ' + offersArray[i].location.y + 'px;';
      pinImg.src = offersArray[i].author.avatar;
      pinImg.alt = offersArray[i].offer.title;
      fragment.appendChild(pinElement);
    }
    fragment.appendChild(getOffer(offersArray[0])); // временно для задания
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
