import Popup from './Popup';
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitCallback) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.edit-form');
    this._formInputs = this._form.querySelectorAll('.edit-form__input');
    this._button = this._form.querySelector('.edit-form__button');
    this._buttonText = this._button.textContent;
  };

  openPopup() {
    super.openPopup();
    this._button.textContent = this._buttonText;
  };

  closePopup() {
    super.closePopup();
    this._form.reset();
  };

  _getInputValues() {
    this._formValues = {};
    Array.from(this._formInputs).forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  };

  setInputValues(data) {
    this._formInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._button.textContent = 'Сохранение...';
      this._submitCallback(e, this._getInputValues());
    });
  };
}