import './index.css';
import {enableValidation} from '../components/validate';
import {addNewCard, handleAddNewCardBtnClick, handleCloseAddCardBtnClick, handlePhotoViewierCloseBtnClick, renderInitialCard} from '../components/card';
import {openPopup, closePopup, saveEditForm, enableClosePopup} from '../components/modal';

const editProfilePopup = document.querySelector('#editProfile');
const editProfileBtn = document.querySelector('.profile__button_type_edit-profile');
const closeEditProfileBtn = document.querySelector('.popup__button');
const userNameFromPopup = editProfilePopup.querySelector('#userName');
const userNameFromProfile = document.querySelector('.profile__name');
const userFieldOfActivityFromPopup = editProfilePopup.querySelector('#user-field-of-activity');
const userFieldOfActivityFromProfile = document.querySelector('.profile__field-of-activity');
const editProfileForm = editProfilePopup.querySelector('.edit-form');
const cardsContainer = document.querySelector('.cards-container');
const addNewCardPopup = document.querySelector('#addCard');
const addNewCardBtn = document.querySelector('.profile__button_type_add');
const closeAddCardBtn = addNewCardPopup.querySelector('#addCardPopupBtn');
const addNewCardForm = addNewCardPopup.querySelector('.edit-form');
const photoViewierPopup = document.querySelector('#photo-viewier');
const photoViewierCloseBtn = photoViewierPopup.querySelector('#photo-viewier-close-btn');

const handleCloseEditProfileBtnClick = () => {
  closePopup(editProfilePopup)
};

const handleEditProfileBtnClick = () => {
  userNameFromPopup.value = userNameFromProfile.textContent;
  userFieldOfActivityFromPopup.value = userFieldOfActivityFromProfile.textContent;
  openPopup(editProfilePopup);
};

const hanleSaveEditForm = (event) => {
  const params = {
    userNameFromProfile,
    userNameFromPopup,
    userFieldOfActivityFromProfile,
    userFieldOfActivityFromPopup,
    editProfilePopup
  }
  saveEditForm(event, params)
}

editProfileBtn.addEventListener('click', handleEditProfileBtnClick);

closeEditProfileBtn.addEventListener('click', handleCloseEditProfileBtnClick);

editProfileForm.addEventListener('submit', hanleSaveEditForm);

renderInitialCard(cardsContainer);

addNewCardBtn.addEventListener('click', handleAddNewCardBtnClick);

closeAddCardBtn.addEventListener('click', handleCloseAddCardBtnClick)

addNewCardForm.addEventListener('submit', (e) => addNewCard(e, cardsContainer, addNewCardForm));

photoViewierCloseBtn.addEventListener('click', handlePhotoViewierCloseBtnClick);
enableValidation({
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__button',
  inactiveButtonClass: 'edit-form__button_disabled',
  inputErrorClass: 'edit-form__input_error',
  errorClass: 'edit-form__input__signature_active'
});

enableClosePopup();
