import './index.css';
import {enableValidation} from '../components/validate';
import {createCardsItem, handleCloseAddCardBtnClick } from '../components/card';
import {openPopup, closePopup, enableClosePopup, handlePhotoViewierCloseBtnClick} from '../components/modal';
import { resetInputsValue } from '../components/utils';

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
const cardName = addNewCardPopup.querySelector('#card-name');
const cardLink = addNewCardPopup.querySelector('#card-link');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export function saveEditForm(event, params) {
  event.preventDefault();
  params.userNameFromProfile.textContent = params.userNameFromPopup.value;
  params.userFieldOfActivityFromProfile.textContent = params.userFieldOfActivityFromPopup.value;
  closePopup(params.editProfilePopup)
};

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

export const addNewCard = (event, cardsContainer, addNewCardForm) => {
  event.preventDefault();
  cardsContainer.prepend(createCardsItem(cardName.value, cardLink.value));
  closePopup(addNewCardPopup);
  resetInputsValue(addNewCardForm)
};

export const handleAddNewCardBtnClick = () => {
  addNewCardPopup.querySelector('.edit-form__button').classList.add('edit-form__button_disabled')
  openPopup(addNewCardPopup)
};



editProfileBtn.addEventListener('click', handleEditProfileBtnClick);

closeEditProfileBtn.addEventListener('click', handleCloseEditProfileBtnClick);

editProfileForm.addEventListener('submit', hanleSaveEditForm);

initialCards.forEach(el => cardsContainer.append(createCardsItem(el.name, el.link)));

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
