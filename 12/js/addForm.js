'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var mapMainPinElement = document.querySelector('.map__pin--main');
  var formAddElement = document.querySelector('.ad-form');
  var errorTemplate = document.querySelector('#error').content;
  var successTemplate = document.querySelector('#success').content;
  var formAddFieldsetElements = formAddElement.querySelectorAll('fieldset');
  var addressElement = formAddElement.querySelector('#address');
  var roomsSelectElement = formAddElement.querySelector('#room_number');
  var guestsSelectElement = formAddElement.querySelector('#capacity');
  var selectTypeElement = formAddElement.querySelector('#type');
  var inputPriceElement = formAddElement.querySelector('#price');
  var timeMinElement = formAddElement.querySelector('#timein');
  var timeOutElement = formAddElement.querySelector('#timeout');
  var avatarImgElement = formAddElement.querySelector('#avatar');
  var avatarPreviewElement = formAddElement.querySelector('.ad-form-header__preview');
  var offerImagesElement = formAddElement.querySelector('#images');
  var offerImagesPreviewElement = document.querySelector('.ad-form__photo');
  var resetFormElement = formAddElement.querySelector('.ad-form__reset');

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

  var setAddressValue = function () {
    var x = window.util.getPinCoordinates(mapMainPinElement, 'main').x;
    var y = window.util.getPinCoordinates(mapMainPinElement, 'main').y;
    addressElement.value = x + ', ' + y;
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

  var renderPreview = function (file, width, height, imgContainer) {
    var reader = new FileReader();
    var imgPreview = new Image(width, height);
    reader.onloadend = function () {
      clearPreview(imgContainer);
      imgPreview.src = reader.result;
      imgContainer.appendChild(imgPreview);
    };
    reader.readAsDataURL(file);
  };

  var onAvatarChange = function (evt) {
    if (validateImages(evt.currentTarget.files) === '') {
      renderPreview(evt.currentTarget.files[0], 40, 40, avatarPreviewElement);
    }
  };

  var onOfferImgChange = function (evt) {
    if (validateImages(evt.currentTarget.files) === '') {
      renderPreview(evt.currentTarget.files[0], 70, 70, offerImagesPreviewElement);
    }
  };

  var onFormAddClick = function () {
    guestsSelectElement.setCustomValidity(roomsGuestsValidate());
    avatarImgElement.setCustomValidity(validateImages(avatarImgElement.files));
    offerImagesElement.setCustomValidity(validateImages(offerImagesElement.files));
  };

  var onSubmitSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    var removeSuccessElement = function () {
      mainElement.removeChild(mainElement.querySelector('.success'));
    };
    var removeSuccessElementByEscKey = function (evt) {
      if (evt.key === window.util.ESC_KEY) {
        removeSuccessElement();
        document.removeEventListener('keydown', removeSuccessElementByEscKey);
      }
    };
    successElement.querySelector('.success')
      .addEventListener('click', removeSuccessElement);
    document.addEventListener('keydown', removeSuccessElementByEscKey);
    mainElement.appendChild(successElement);
    window.app.reset();
  };

  var onSubmitError = function (error) {
    var errorElement = errorTemplate.cloneNode(true);
    var removeErrorElement = function () {
      mainElement.removeChild(mainElement.querySelector('.error'));
    };
    var removeErrorElementByEscKey = function (evt) {
      if (evt.key === window.util.ESC_KEY) {
        removeErrorElement();
        document.removeEventListener('keydown', removeErrorElementByEscKey);
      }
    };
    errorElement.querySelector('.error__message').textContent = error;
    errorElement.querySelector('.error__button')
      .addEventListener('click', removeErrorElement);
    errorElement.querySelector('.error')
      .addEventListener('click', removeErrorElement);
    document.addEventListener('keydown', removeErrorElementByEscKey);
    mainElement.appendChild(errorElement);
  };

  var onFormAddSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formAddElement), onSubmitSuccess, onSubmitError);
  };

  var onFormReset = function (evt) {
    window.app.reset(evt);
  };

  var clearPreview = function (imgContainer) {
    if (imgContainer.querySelector('img')) {
      imgContainer.removeChild(imgContainer.querySelector('img'));
    }
  };

  var resetForm = function () {
    formAddElement.reset();
    clearPreview(avatarPreviewElement);
    clearPreview(offerImagesPreviewElement);
  };

  var init = function () {
    setAddressValue();
    setMinPrice(selectTypeElement.value);
    selectTypeElement.addEventListener('change', function (evt) {
      setMinPrice(evt.currentTarget.value);
    });
    synchronizeTime(timeMinElement);
    timeMinElement.addEventListener('change', synchronizeTime);
    timeOutElement.addEventListener('change', synchronizeTime);
    formAddElement.addEventListener('click', onFormAddClick);
    formAddElement.addEventListener('submit', onFormAddSubmit);
    resetFormElement.addEventListener('click', onFormReset);
    avatarImgElement.addEventListener('change', onAvatarChange);
    offerImagesElement.addEventListener('change', onOfferImgChange);
  };

  init();

  window.addForm = {
    enable: enableFormAdd,
    disable: disableFormAdd,
    setAddress: setAddressValue,
    reset: resetForm
  };
})();
