'use strict';

var map = document.querySelector('.map');
var MAP_PIN = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPinsList = document.querySelector('.map__pins');
var TIMES = ['12:00', '13:00', '14:00'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var POSSIBLE_LOCATIONS = {
  x: {
    min: 0,
    max: 1200
  },
  y: {
    min: 130,
    max: 630
  }
};

var randomInt = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};
var arrayRandElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};
var getArrayRandomLength = function (array) {
  return array.slice(0, randomInt(1, array.length + 1));
};

var generateOffersData = function (countOffets) {
  var offersData = [];
  for (var i = 1; i <= countOffets; i++) {
    var locationX = randomInt(POSSIBLE_LOCATIONS.x.min, POSSIBLE_LOCATIONS.x.max);
    var locationY = randomInt(POSSIBLE_LOCATIONS.y.min, POSSIBLE_LOCATIONS.y.max);
    offersData[i - 1] = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Lorem ipsum dolor sit amet',
        address: locationX + ', ' + locationY,
        price: randomInt(10000, 99000),
        type: arrayRandElement(TYPES),
        rooms: randomInt(1, 6),
        guests: randomInt(2, 5),
        checkin: arrayRandElement(TIMES),
        checkout: arrayRandElement(TIMES),
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
    var offerElement = MAP_PIN.cloneNode(true);
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

map.classList.remove('map--faded');
mapPinsList.appendChild(renderOffers(generateOffersData(8)));
