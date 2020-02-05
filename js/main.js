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
var PossibleLocations = {
  x: {
    MIN: 0,
    MAX: 1200
  },
  y: {
    MIN: 130,
    MAX: 630
  }
};

var mapElement = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPinsListElement = document.querySelector('.map__pins');


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
    var coorX = item.location.x + offerImg.width;
    var coorY = item.location.y + offerImg.height;
    offerElement.style = 'left: ' + coorX + 'px; top: ' + coorY + 'px;';
    offerImg.src = item.author.avatar;
    offerImg.alt = item.offer.title;
    fragment.appendChild(offerElement);
  });
  return fragment;
};

var showMap = function () {
  mapElement.classList.remove('map--faded');
};

var init = function () {
  showMap();
  mapPinsListElement.appendChild(renderOffers(generateOffersData()));
};

init();
