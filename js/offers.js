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
    var setElementTextContent = function (element, text) {
      if (text) {
        element.textContent = text;
      } else {
        element.classList.add(window.util.HIDDEN_CLASS);
      }
    };
    setElementTextContent(offerElement
      .querySelector('.popup__title'), offerData.offer.title);
    setElementTextContent(offerElement
      .querySelector('.popup__text--address'), offerData.offer.address);
    setElementTextContent(offerElement
      .querySelector('.popup__text--price'), offerData.offer.price + '₽/ночь');
    setElementTextContent(offerElement
      .querySelector('.popup__type'), window.data.HouseTypes[offerData.offer.type]);
    setElementTextContent(offerElement
      .querySelector('.popup__text--capacity'), offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей');
    setElementTextContent(offerElement
      .querySelector('.popup__text--time'), 'Заезд после ' + offerData.offer.checkin + ' выезд до ' + offerData.offer.checkout);
    setElementTextContent(offerElement
      .querySelector('.popup__features'), offerData.offer.features.join(', '));
    setElementTextContent(offerElement
      .querySelector('.popup__description'), offerData.offer.description);
    offerImagesElement.removeChild(offerImagesElement.querySelector('.popup__photo'));
    if (offerData.offer.photos.length !== 0) {
      offerData.offer.photos.forEach(function (item) {
        var offerImg = offerImgTemplate.cloneNode(true);
        offerImg.src = item;
        offerImagesElement.appendChild(offerImg);
      });
    }
    if (offerData.author.avatar) {
      offerElement.querySelector('.popup__avatar')
        .src = offerData.author.avatar;
    } else {
      offerElement.querySelector('.popup__avatar').classList.add(Window.util.HIDDEN_CLASS);
    }
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

  var onEscKeyHidePopup = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      hidePopupElements();
      document.removeEventListener('keydown', onEscKeyHidePopup);
    }
  };

  var onClickHidePopupElements = function () {
    hidePopupElements();
  };

  var controlPopup = function (evt) {
    var popupId = window.util.parseNumber(evt.currentTarget.id);
    var popup = document.querySelector('#offer_' + popupId);
    hidePopupElements();
    removePinsActiveClass();
    popup.classList.remove(window.util.HIDDEN_CLASS);
    evt.currentTarget.classList.add(MAP_PIN_ACTIVE_CLASS);
    popup.querySelector('.popup__close').addEventListener('click', onClickHidePopupElements);
    document.addEventListener('keydown', onEscKeyHidePopup);
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
      if (offersArray[i].offer) {
        fragment.appendChild(getPin(offersArray[i]));
        fragment.appendChild(getOffer(offersArray[i]));
      }
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
      var compareProperty = function (obj, propertyName, propertyToCompare, defaultProperty) {
        return obj[propertyName] === propertyToCompare || obj[propertyName] === defaultProperty;
      };
      var typeFlag = compareProperty(FilterObject, 'housing-type', item.offer.type, 'any');
      var roomsFlag = compareProperty(FilterObject, 'housing-rooms', item.offer.rooms.toString(), 'any');
      var guestsFlag = compareProperty(FilterObject, 'housing-guests', item.offer.guests.toString(), 'any');
      var priceFlag = window.data.PriceNames[FilterObject['housing-price']](item.offer.price);
      var featuresFlag = FilterObject['features'].length === 0
        ? true
        : window.util.compareArrays(FilterObject['features'], item.offer.features);
      return typeFlag && roomsFlag && guestsFlag && priceFlag && featuresFlag;
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
