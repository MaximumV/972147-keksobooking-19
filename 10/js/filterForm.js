'use strict';

(function () {
  var formFilterElement = document.querySelector('.map__filters');
  var typeElement = formFilterElement.querySelector('#housing-type');
  var priceElement = formFilterElement.querySelector('#housing-price');
  var roomsElement = formFilterElement.querySelector('#housing-rooms');
  var guestsElements = formFilterElement.querySelector('#housing-guests');

  var FiltersObject = {
    'housing-type': typeElement.value,
    'housing-price': priceElement.value,
    'housing-rooms': roomsElement.value,
    'housing-guests': guestsElements.value
  };

  var onChangeSelect = function (evt) {
    FiltersObject[evt.currentTarget.id] = evt.currentTarget.value;
    window.map.clear();
    window.offers.generate(FiltersObject);
  };

  typeElement.addEventListener('change', onChangeSelect);
  priceElement.addEventListener('change', onChangeSelect);
  roomsElement.addEventListener('change', onChangeSelect);
  guestsElements.addEventListener('change', onChangeSelect);

  window.filterForm = {
    filter: FiltersObject
  };
})();
