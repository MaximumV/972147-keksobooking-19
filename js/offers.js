'use strict';

(function () {
  var COUNT_OFFERS = 8;
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var generateOffersData = function () {
    var offersData = [];
    for (var i = 1; i <= COUNT_OFFERS; i++) {
      var locationX =
        window.util.getRandomIntFromRange(window.data.PossibleLocations.x.MIN, window.data.PossibleLocations.x.MAX);
      var locationY =
        window.util.getRandomIntFromRange(window.data.PossibleLocations.y.MIN, window.data.PossibleLocations.y.MAX);
      offersData[i - 1] = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          title: 'Lorem ipsum dolor sit amet',
          address: locationX + ', ' + locationY,
          price: window.util.getRandomIntFromRange(10000, 99000),
          type: window.util.getRandomArrayElement(window.data.TYPES),
          rooms: window.util.getRandomIntFromRange(1, 6),
          guests: window.util.getRandomIntFromRange(2, 5),
          checkin: window.util.getRandomArrayElement(window.data.TIMES),
          checkout: window.util.getRandomArrayElement(window.data.TIMES),
          features: window.util.getArrayRandomLength(window.data.FEATURES),
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto culpa dicta, iure nesciunt omnis recusandae.',
          photos: window.util.getArrayRandomLength(window.data.PHOTOS)
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

  window.offers = {
    generate: generateOffersData,
    render: renderOffers
  };
})();
