'use strict';

var TIMES = ['12:00', '13:00', '14:00'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var COUNT_OFFERS = 8;
var ENTER_KEY = 'Enter';
var PossibleLocations = {
  x: {
    MIN: 0,
    MAX: 1138
  },
  y: {
    MIN: 130,
    MAX: 630
  }
};
var RoomsGuestsRelation = {
  one: [1],
  two: [1, 2],
  three: [1, 2, 3],
  hundred: [0]
};

var mapElement = document.querySelector('.map');
var mapPinsListElement = document.querySelector('.map__pins');
var mapMainPinElement = document.querySelector('.map__pin--main');
var mapMainPinImg = mapMainPinElement.querySelector('img');
var formAddElement = document.querySelector('.ad-form');
var formAddFieldsetElements = formAddElement.querySelectorAll('fieldset');
var addressElement = formAddElement.querySelector('#address');
var roomsSelectElement = formAddElement.querySelector('#room_number');
var guestsSelectElement = formAddElement.querySelector('#capacity');
var formFilterElement = document.querySelector('.map__filters');
var formFilterSelectElements = formFilterElement.querySelectorAll('select');
var formFilterFieldsetElements = formFilterElement.querySelectorAll('fieldset');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var OffsetPin = {
  main: {
    x: 31,
    y: 72
  },
  offer: {
    x: 25,
    y: 70
  }
};

function calculateWidthElement(element) {
  return parseInt(window.getComputedStyle(element).width, 10) +
    parseInt(window.getComputedStyle(element).borderLeftWidth, 10) +
    parseInt(window.getComputedStyle(element).borderRightWidth, 10) +
    parseInt(window.getComputedStyle(element).paddingLeft, 10) +
    parseInt(window.getComputedStyle(element).paddingRight, 10);
}

function calculateHeightElement(element) {
  return parseInt(window.getComputedStyle(element).height, 10) +
    parseInt(window.getComputedStyle(element).borderTopWidth, 10) +
    parseInt(window.getComputedStyle(element).borderBottomWidth, 10) +
    parseInt(window.getComputedStyle(element).paddingTop, 10) +
    parseInt(window.getComputedStyle(element).paddingBottom, 10);
}

var getRandomIntFromRange = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getArrayRandomLength = function (array) {
  return array.slice(0, getRandomIntFromRange(1, array.length + 1));
};

var generateOffersData = function () {
  var offersData = [];
  for (var i = 1; i <= COUNT_OFFERS; i++) {
    var locationX = getRandomIntFromRange(PossibleLocations.x.MIN, PossibleLocations.x.MAX);
    var locationY = getRandomIntFromRange(PossibleLocations.y.MIN, PossibleLocations.y.MAX);
    offersData[i - 1] = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Lorem ipsum dolor sit amet',
        address: locationX + ', ' + locationY,
        price: getRandomIntFromRange(10000, 99000),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomIntFromRange(1, 6),
        guests: getRandomIntFromRange(2, 5),
        checkin: getRandomArrayElement(TIMES),
        checkout: getRandomArrayElement(TIMES),
        features: getArrayRandomLength(FEATURES),
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto culpa dicta, iure nesciunt omnis recusandae.',
        photos: getArrayRandomLength(PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return offersData;
};

var renderOffers = function (offersArray) {
  var fragment = document.createDocumentFragment();
  offersArray.forEach(function (item) {
    var offerElement = mapPinTemplate.cloneNode(true);
    var offerImg = offerElement.querySelector('img');
    offerElement.style = 'left: ' + item.location.x + 'px; top: ' + item.location.y + 'px;';
    offerImg.src = item.author.avatar;
    offerImg.alt = item.offer.title;
    fragment.appendChild(offerElement);
  });
  return fragment;
};

var disableFormElements = function (nodeList) {
  for (var i = 0; i < nodeList.length; i++) {
    nodeList[i].setAttribute('disabled', 'disabled');
  }
};

var enableFormElements = function (nodeList) {
  for (var i = 0; i < nodeList.length; i++) {
    nodeList[i].removeAttribute('disabled');
  }
};

var enableMap = function () {
  if (mapElement.classList.contains('map--faded')) {
    enableFormElements(formFilterFieldsetElements);
    enableFormElements(formFilterSelectElements);
    mapPinsListElement.appendChild(renderOffers(generateOffersData()));
    mapElement.classList.remove('map--faded');
  }
};

var disableMap = function () {
  disableFormElements(formFilterFieldsetElements);
  disableFormElements(formFilterSelectElements);
  mapElement.classList.add('map--faded');
};

var enableFormAdd = function () {
  if (formAddElement.classList.contains('ad-form--disabled')) {
    enableFormElements(formAddFieldsetElements);
    formAddElement.classList.remove('ad-form--disabled');
  }
};

var disableFormAdd = function () {
  disableFormElements(formAddFieldsetElements);
  formAddElement.classList.add('ad-form--disabled');
};

var activateApp = function () {
  enableMap();
  enableFormAdd();
  mapMainPinElement.removeEventListener('mousedown', onLeftClickPinElement);
  mapMainPinElement.removeEventListener('keydown', onEnterKeyPinElement);
};

var deactivateApp = function () {
  disableMap();
  disableFormAdd();
};

var onLeftClickPinElement = function (evt) {
  if (evt.button === 0) {
    activateApp();
  }
};

var onEnterKeyPinElement = function (evt) {
  if (evt.key === ENTER_KEY) {
    activateApp();
  }
};

var getMainPinCoordinates = function () {
  var coorX = parseInt(mapMainPinElement.style.left, 10) + OffsetPin.main.x;
  var coorY = parseInt(mapMainPinElement.style.top, 10) + OffsetPin.main.y;
  return coorX + ', ' + coorY;
};

var setAddressValue = function (address) {
  addressElement.value = address;
};

var roomsGuestsValidate = function () {
  var rooms = parseInt(roomsSelectElement.value, 10);
  var guests = parseInt(guestsSelectElement.value, 10);
  var msg = '';
  switch (rooms) {
    case 1:
      if (!RoomsGuestsRelation.one.includes(guests)) {
        msg = 'Количество гостей должно быть равно 1';
      }
      break;
    case 2:
      if (!RoomsGuestsRelation.two.includes(guests)) {
        msg = 'Количество гостей должно быть 1 или 2';
      }
      break;
    case 3:
      if (!RoomsGuestsRelation.three.includes(guests)) {
        msg = 'Количество гостей должно быть 1, 2 или 3';
      }
      break;
    case 100:
      if (!RoomsGuestsRelation.hundred.includes(guests)) {
        msg = '100 комнат предназначены не для гостей';
      }
  }
  return msg;
};

var onFormAddSubmit = function () {
  guestsSelectElement.setCustomValidity(roomsGuestsValidate());
};

var init = function () {
  deactivateApp();
  setAddressValue(getMainPinCoordinates());
  formAddElement.addEventListener('click', onFormAddSubmit);
  mapMainPinElement.addEventListener('mousedown', onLeftClickPinElement);
  mapMainPinElement.addEventListener('keydown', onEnterKeyPinElement);
};

init();
