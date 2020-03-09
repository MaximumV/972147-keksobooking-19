'use strict';

(function () {
  var mapMainPinElement = document.querySelector('.map__pin--main');
  var formAddElement = document.querySelector('.ad-form');
  var formAddFieldsetElements = formAddElement.querySelectorAll('fieldset');
  var addressElement = formAddElement.querySelector('#address');
  var roomsSelectElement = formAddElement.querySelector('#room_number');
  var guestsSelectElement = formAddElement.querySelector('#capacity');
  var selectTypeElement = formAddElement.querySelector('#type');
  var inputPriceElement = formAddElement.querySelector('#price');
  var timeMinElement = formAddElement.querySelector('#timein');
  var timeOutElement = formAddElement.querySelector('#timeout');
  var avatarImgElement = formAddElement.querySelector('#avatar');
  var offerImagesElement = formAddElement.querySelector('#images');

  var setMinPrice = function (type) {
    inputPriceElement.min = window.data.HouseTypePriceRelation[type];
    inputPriceElement.placeholder = window.data.HouseTypePriceRelation[type];
  };

  var synchronizeTime = function (evt) {
    if (evt.currentTarget === timeMinElement) {
      timeOutElement.value = evt.currentTarget.value;
    } else if (evt.currentTarget === timeOutElement) {
      timeMinElement.value = evt.currentTarget.value;
    } else if (evt.value) {
      timeOutElement.value = evt.value;
    }
  };

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
    return window.data.RoomsGuestsRelation[rooms].count.includes(guests)
      ? ''
      : window.data.RoomsGuestsRelation[rooms].error;
  };

  var validateImages = function (files) {
    var isValidFile = '';
    if (files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        if (files[i].type !== 'image/jpeg' && files[i].type !== 'image/png') {
          isValidFile = 'Недопустимый тип файла. Допускаются только jpg и png файлы';
        }
      }
    }
    return isValidFile;
  };

  var onFormAddSubmit = function () {
    guestsSelectElement.setCustomValidity(roomsGuestsValidate());
    avatarImgElement.setCustomValidity(validateImages(avatarImgElement.files));
    offerImagesElement.setCustomValidity(validateImages(offerImagesElement.files));
  };

  var init = function () {
    setAddressValue(window.util.getPinCoordinates(mapMainPinElement, 'main').x
      + ', '
      + window.util.getPinCoordinates(mapMainPinElement, 'main').y);
    setMinPrice(selectTypeElement.value);
    selectTypeElement.addEventListener('change', function (evt) {
      setMinPrice(evt.currentTarget.value);
    });
    synchronizeTime(timeMinElement);
    timeMinElement.addEventListener('change', synchronizeTime);
    timeOutElement.addEventListener('change', synchronizeTime);
    formAddElement.addEventListener('click', onFormAddSubmit);
  };

  init();

  window.addForm = {
    enable: enableFormAdd,
    disable: disableFormAdd
  };
})();
