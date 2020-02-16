'use strict';

window.data = (function () {
  return {
    TIMES: ['12:00', '13:00', '14:00'],
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ],
    PossibleLocations: {
      x: {
        MIN: 0,
        MAX: 1138
      },
      y: {
        MIN: 130,
        MAX: 630
      }
    },
    RoomsGuestsRelation: {
      one: [1],
      two: [1, 2],
      three: [1, 2, 3],
      hundred: [0]
    },
    OffsetPins: {
      main: {
        x: 31,
        y: 72
      },
      offer: {
        x: 25,
        y: 70
      }
    }
  };
})();
