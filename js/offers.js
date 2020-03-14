'use strict';

(function () {
  var COUNT_OFFERS = 5;
  var MAP_PIN_ACTIVE_CLASS = 'map__pin--active';
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var offerPopupTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var mapPinsListElement = document.querySelector('.map__pins');
  var offersData;

  var setOffersId = function (data) {
    return data.map(function (value, i) {
      value.id = i;
      return value;
    });
  };

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
    offerElement.id = 'offer_' + offerData.id;
    offerElement.classList.add(window.util.HIDDEN_CLASS);
    return offerElement;
  };

  var removePinsActiveClass = function () {
    document.querySelectorAll('.map__pin').forEach(function (item) {
      item.classList.remove(MAP_PIN_ACTIVE_CLASS);
    });
  };

  var hidePopupElements = function () {
    document.querySelectorAll('.map__card').forEach(function (item) {
      item.classList.add(window.util.HIDDEN_CLASS);
    });
    removePinsActiveClass();
  };

  var hidePopupElementsByEsc = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      hidePopupElements();
      document.removeEventListener('keydown', hidePopupElementsByEsc);
    }
  };

  var controlPopup = function (evt) {
    var popupId = window.util.parseNumber(evt.currentTarget.id);
    var popup = document.querySelector('#offer_' + popupId);
    hidePopupElements();
    removePinsActiveClass();
    popup.classList.remove(window.util.HIDDEN_CLASS);
    evt.currentTarget.classList.add(MAP_PIN_ACTIVE_CLASS);
    popup.querySelector('.popup__close').addEventListener('click', hidePopupElements);
    document.addEventListener('keydown', hidePopupElementsByEsc);
  };

  var getPin = function (pinData) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinElement.style = 'left: ' + pinData.location.x + 'px; top: ' + pinData.location.y + 'px;';
    pinElement.id = 'pin_' + pinData.id;
    pinElement.addEventListener('click', controlPopup);
    pinImg.src = pinData.author.avatar;
    pinImg.alt = pinData.offer.title;
    return pinElement;
  };

  var renderOffers = function (offersArray) {
    var fragment = document.createDocumentFragment();
    var offersLength = offersArray.length < COUNT_OFFERS ? offersArray.length : COUNT_OFFERS;
    for (var i = 0; i < offersLength; i++) {
      fragment.appendChild(getPin(offersArray[i]));
      fragment.appendChild(getOffer(offersArray[i]));
    }
    mapPinsListElement.appendChild(fragment);
    window.util.hideError();
  };

  var showError = function (error) {
    window.util.showError(error);
    window.app.deactivate();
  };

  var callOffersFunc = function (cb) {
    if (offersData) {
      cb(offersData);
    } else {
      window.backend.load(function (data) {
        offersData = setOffersId(data);
        cb(offersData);
      }, showError);
    }
  };

  var filterOffers = function (data, FilterObject) {
    return data.filter(function (item) {
      return FilterObject['housing-type'] === item.offer.type || FilterObject['housing-type'] === 'any';
    });
  };

  var generateOffers = function (FilterObject) {
    callOffersFunc(function (data) {
      renderOffers(filterOffers(data, FilterObject));
    });
  };

  window.offers = {
    generate: generateOffers,
    get: getOffer
  };
})();
