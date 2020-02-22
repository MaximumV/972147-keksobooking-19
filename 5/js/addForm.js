'use strict';

(function () {
  var mapMainPinElement = document.querySelector('.map__pin--main');
  var formAddElement = document.querySelector('.ad-form');
  var formAddFieldsetElements = formAddElement.querySelectorAll('fieldset');
  var addressElement = formAddElement.querySelector('#address');
  var roomsSelectElement = formAddElement.querySelector('#room_number');
  var guestsSelectElement = formAddElement.querySelector('#capacity');

  var enableFormAdd = function () {
    if (formAddElement.classList.contains('ad-form--disabled')) {
      window.util.enableFormElements(formAddFieldsetElements);
      formAddElement.classList.remove('ad-form--disabled');
    }
  };

  var disableFormAdd = function () {
    window.util.disableFormElements(formAddFieldsetElements);
    formAddElement.classList.add('ad-form--disabled');
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
        if (!window.data.RoomsGuestsRelation.one.includes(guests)) {
          msg = 'Количество гостей должно быть равно 1';
        }
        break;
      case 2:
        if (!window.data.RoomsGuestsRelation.two.includes(guests)) {
          msg = 'Количество гостей должно быть 1 или 2';
        }
        break;
      case 3:
        if (!window.data.RoomsGuestsRelation.three.includes(guests)) {
          msg = 'Количество гостей должно быть 1, 2 или 3';
        }
        break;
      case 100:
        if (!window.data.RoomsGuestsRelation.hundred.includes(guests)) {
          msg = '100 комнат предназначены не для гостей';
        }
    }
    return msg;
  };

  var onFormAddSubmit = function () {
    guestsSelectElement.setCustomValidity(roomsGuestsValidate());
  };

  var init = function () {
    setAddressValue(window.util.getPinCoordinates(mapMainPinElement, 'main').x
      + ', '
      + window.util.getPinCoordinates(mapMainPinElement, 'main').y);
    formAddElement.addEventListener('click', onFormAddSubmit);
  };

  init();

  window.addForm = {
    enable: enableFormAdd,
    disable: disableFormAdd
  };
})();
