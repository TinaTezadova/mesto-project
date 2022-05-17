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
      this._disabledFormButton()
    } else {
      this._enableFormButton()
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
      this._checkInputValidity(input, formError)
      this._toggleFormButton()
    }
  }
  _setEventListeners(input, formError) {
    input.addEventListener('input', this._handelnputValidation(input, formError))
  }
  enableValidation() {
    this._formInputs.forEach(input => {
      const formError = input.nextSibling.nextElementSibling
      this._setEventListeners(input,formError)
    })
  }
  resetForm() {
    this._form.reset()
    this._formInputs.forEach(input => {
      input.classList.remove(this._inputErrorClass)
    })
    this._errorFormFields.forEach(item => {
      item.textContent = '';
    })
    this._toggleFormButton()
  }
}





const showError = (input, errorMessage, inputErrorClass, errorClass) => {
  input.classList.add(inputErrorClass);
  const formError = input.nextSibling.nextElementSibling
  formError.textContent = errorMessage;
  formError.classList.add(errorClass);
};

const hideError = (input, inputErrorClass, errorClass) => {
  input.classList.remove(inputErrorClass);
  const formError = input ? .nextSibling.nextElementSibling
  formError.classList.remove(errorClass);
  formError.textContent = '';
};

const checkFormInputsVlid = (formInputs) => {
  return formInputs.filter((el) => el.validity.valid === true).length === formInputs.length
}

const checkInputValidity = (input, formInputs, button, params) => {
  if (!input.validity.valid) {
    showError(input, input.validationMessage, params.inputErrorClass, params.errorClass);
    if (!checkFormInputsVlid(formInputs)) {
      button.classList.add(params.inactiveButtonClass);
      button.disabled = true;
    }
  } else {
    hideError(input, params.inputErrorClass, params.errorClass);
    if (checkFormInputsVlid(formInputs, params.inputErrorClass, params.errorClass)) {
      button.classList.remove(params.inactiveButtonClass);
      button.disabled = false;
    }
  }
};

export const enableValidation = (params) => {
  const forms = document.querySelectorAll(params.formSelector);
  forms.forEach((form) => {
    const formInputs = Array.from(form.querySelectorAll(params.inputSelector));
    const button = form.querySelector(params.submitButtonSelector)
    formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(input, formInputs, button, params);
      });
    });
    form.addEventListener('click', (e) => {
      e.stopPropagation();
    })
  });

}