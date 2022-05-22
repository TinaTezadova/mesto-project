export default class FormValidator {
  constructor(data, selector) {
    this._form = document.querySelector(selector);
    this._inputErrorClass = data.inputErrorClass;
    this._inputSelector = data.inputSelector;
    this._errorClass = data.errorClass;
    this._formInputs = Array.from(this._form.querySelectorAll(data.inputSelector));
    this._formButton = this._form.querySelector(data.submitButtonSelector);
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._errorFormFields = Array.from(this._form.querySelectorAll(data.errorFormFieldClass));
  }
  _enableFormButton() {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.disabled = false;
  }
  _disabledFormButton() {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.disabled = true;
  }
  _toggleFormButton() {
    if (this._formInputs.some(input => {
        return input.validity.valid !== true
      })) {
      this._disabledFormButton();
    } else {
      this._enableFormButton();
    }
  }
  _checkInputValidity(input, formError) {
    if (!input.validity.valid) {
      input.classList.add(this._inputErrorClass);
      formError.textContent = input.validationMessage;
      formError.classList.add(this._errorClass);
    } else {
      input.classList.remove(this._inputErrorClass);
      formError.textContent = '';
      formError.classList.remove(this._errorClass);
    }
  }
  _handelnputValidation(input, formError) {
    return () => {
      this._checkInputValidity(input, formError);
      this._toggleFormButton();
    }
  }
  _setEventListeners(input, formError) {
    input.addEventListener('input', this._handelnputValidation(input, formError));
  }

  _setFormEventListeners() {
    this._form.addEventListener('click', (e) => {
      e.stopPropagation();
    })
  }

  enableValidation() {
    this._setFormEventListeners();
    this._formInputs.forEach(input => {
      const formError = input.nextSibling.nextElementSibling;
      this._setEventListeners(input, formError);
    })
  }

  resetValidation() {
    this._form.reset()
    this._formInputs.forEach(input => {
      input.classList.remove(this._inputErrorClass);
    })
    this._errorFormFields.forEach(item => {
      item.textContent = '';
    })
    this._toggleFormButton();
    this._formButton.classList.add('edit-form__button_disabled')
  }
}