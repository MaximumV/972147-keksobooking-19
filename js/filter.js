'use strict';

(function () {
  var formFilterElement = document.querySelector('.map__filters');
  var typeElement = formFilterElement.querySelector('#housing-type');
  var priceElement = formFilterElement.querySelector('#housing-price');
  var roomsElement = formFilterElement.querySelector('#housing-rooms');
  var guestsElements = formFilterElement.querySelector('#housing-guests');
  var checkboxElements = formFilterElement.querySelectorAll('.map__checkbox');

  var getCheckedCheckboxes = function (elements) {
    return Array.from(elements)
      .filter(function (item) {
        return item.checked;
      })
      .map(function (item) {
        return item.value;
      });
  };

  var onChangeSelect = function (evt) {
    window.Filter[evt.currentTarget.id] = evt.currentTarget.value;
    window.util.debounce(refreshFilter);
  };

  var onChangeCheckbox = function (evt) {
    window.Filter[evt.currentTarget.name] = getCheckedCheckboxes(checkboxElements);
    window.util.debounce(refreshFilter);
  };

  var refreshFilter = function () {
    window.map.clear();
    window.offers.generate(window.Filter);
  };

  window.Filter = {
    'housing-type': typeElement.value,
    'housing-price': priceElement.value,
    'housing-rooms': roomsElement.value,
    'housing-guests': guestsElements.value,
    'features': getCheckedCheckboxes(checkboxElements)
  };

  /** временно для тестов **/
  formFilterElement.addEventListener('reset', function (evt) {
    window.Filter['housing-type'] = evt.currentTarget.querySelector('#housing-type').value;
    window.Filter['housing-price'] = evt.currentTarget.querySelector('#housing-price').value;
    window.Filter['housing-rooms'] = evt.currentTarget.querySelector('#housing-rooms').value;
    window.Filter['housing-guests'] = evt.currentTarget.querySelector('#housing-guests').value;
    window.Filter['features'] = getCheckedCheckboxes(evt.currentTarget.querySelectorAll('.map__checkbox'));
  });
  typeElement.addEventListener('change', onChangeSelect);
  priceElement.addEventListener('change', onChangeSelect);
  roomsElement.addEventListener('change', onChangeSelect);
  guestsElements.addEventListener('change', onChangeSelect);
  checkboxElements.forEach(function (item) {
    item.addEventListener('change', onChangeCheckbox);
  });
})();
