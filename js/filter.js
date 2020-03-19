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
    window.filter.Data[evt.currentTarget.id] = evt.currentTarget.value;
    window.util.debounce(refreshFilter);
  };

  var onChangeCheckbox = function (evt) {
    window.filter.Data[evt.currentTarget.name] = getCheckedCheckboxes(checkboxElements);
    window.util.debounce(refreshFilter);
  };

  var refreshFilter = function () {
    window.map.clear();
    window.offers.generate(window.filter.Data);
  };

  var getFormInputsValue = function () {
    return {
      'housing-type': typeElement.value,
      'housing-price': priceElement.value,
      'housing-rooms': roomsElement.value,
      'housing-guests': guestsElements.value,
      'features': getCheckedCheckboxes(checkboxElements)
    };
  };

  var init = function () {
    typeElement.addEventListener('change', onChangeSelect);
    priceElement.addEventListener('change', onChangeSelect);
    roomsElement.addEventListener('change', onChangeSelect);
    guestsElements.addEventListener('change', onChangeSelect);
    checkboxElements.forEach(function (item) {
      item.addEventListener('change', onChangeCheckbox);
    });
  };

  init();

  window.filter = {
    Data: getFormInputsValue(),
    clear: function () {
      formFilterElement.reset();
      this.Data = getFormInputsValue();
    }
  };
})();
