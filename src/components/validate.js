const showError = (input, errorMessage, inputErrorClass, errorClass) => {
    input.classList.add(inputErrorClass);
    const formError = input.nextSibling.nextElementSibling
    formError.textContent = errorMessage;
    formError.classList.add(errorClass);
  };

const hideError = (input, inputErrorClass, errorClass) => {
    input.classList.remove(inputErrorClass);
    const formError = input?.nextSibling.nextElementSibling
    formError.classList.remove(errorClass);
    formError.textContent = '';
  };
  
  const checkFormInputsVlid = (formInputs) => {
      console.log(formInputs);
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
      hideError(input);
      if (checkFormInputsVlid(formInputs, params.inputErrorClass, params.errorClass)) {
        button.classList.remove(params.inactiveButtonClass);
        button.disabled = false;
      }
    }
  };

export const enableValidation = (params) => {
    console.log(params);
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