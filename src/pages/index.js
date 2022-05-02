import './index.css';
import { enableValidation } from '../components/validate';
import { createCardsItem } from '../components/card';
import { openPopup, closePopup, enableClosePopup, handlePhotoViewierCloseBtnClick } from '../components/modal';
import { resetInputsValue } from '../components/utils';
import { getUserInfo, getInitialCards, updateUserInfo, createNewCard, updateAvatar, deleteCard } from '../components/api'

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
const userNameWrap = document.querySelector('.profile__name');
const userFieldOfActivityWrap = document.querySelector('.profile__field-of-activity');
const userAvatarWrap = document.querySelector('.profile__avatar');
const userAvatar = document.querySelector('.profile__avatar-wrapper');
const editAvatarPopup = document.querySelector('#editAvatar');
const editAvatarPopupForm = editAvatarPopup.querySelector('.edit-form');
const deleteCardPopup = document.querySelector('#deleteCard');
const deleteCardForm = deleteCardPopup.querySelector('.edit-form');

function saveEditForm(event, params) {
  event.preventDefault();
  const button = params.editProfilePopup.querySelector('.edit-form__button');
  button.textContent = 'Сохранение...';
  updateUserInfo({
    name: params.userNameFromPopup.value,
    about: params.userFieldOfActivityFromPopup.value
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      params.userNameFromProfile.textContent = result.name;
      params.userFieldOfActivityFromProfile.textContent = result.about;
    })
    .finally(() => {
      closePopup(params.editProfilePopup);
      button.textContent = 'Сохранить';
    })
    .catch((err) => {
      console.log(err);
    });
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

const addNewCard = (event, cardsContainer, addNewCardForm) => {
  event.preventDefault();
  const button = addNewCardPopup.querySelector('.edit-form__button');
  button.textContent = 'Сохранение...';
  createNewCard({
    name: cardName.value,
    link: cardLink.value
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      cardsContainer.prepend(createCardsItem(result.name, result.link, result.likes.length, result.owner._id, result._id));
    })
    .finally(() => {
      closePopup(addNewCardPopup);
      resetInputsValue(addNewCardForm);
      button.textContent = 'Создать';
    })
    .catch((err) => {
      console.log(err);
    });

};

const handleAddNewCardBtnClick = () => {
  addNewCardPopup.querySelector('.edit-form__button').classList.add('edit-form__button_disabled')
  openPopup(addNewCardPopup)
};

const handleCloseAddCardBtnClick = () => {
  closePopup(addNewCardPopup)
};

const handleEditAvatarClick = () => {
  openPopup(editAvatarPopup)
}

const handleSaveAvatarClick = (e) => {
  e.preventDefault();
  const button = editAvatarPopup.querySelector('.edit-form__button');
  button.textContent = 'Сохранение...';
  const avatar = editAvatarPopup.querySelector('.edit-form__input').value;
  const form = editAvatarPopup.querySelector('.edit-form');
  updateAvatar(avatar)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      userAvatarWrap.src = result.avatar;
    })
    .finally(() => {
      closePopup(editAvatarPopup);
      resetInputsValue(form)
      button.textContent = 'Сохранить';
    })
    .catch((err) => {
      console.log(err);
    });
}

const handleDeleteCardAccessClick = (e) => {
  e.preventDefault();
  const cardId = deleteCardPopup.getAttribute('cardId');
  const cardItem = document.getElementById(`${cardId}`);
  deleteCard(cardId)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      cardItem.remove();
    })
    .finally(() => {
      closePopup(deleteCardPopup)
    })
    .catch((err) => {
      console.log(err);
    });

}



editProfileBtn.addEventListener('click', handleEditProfileBtnClick);

closeEditProfileBtn.addEventListener('click', handleCloseEditProfileBtnClick);

editProfileForm.addEventListener('submit', hanleSaveEditForm);

getInitialCards()
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    result.forEach(el => cardsContainer.append(createCardsItem(el.name, el.link, el.likes.length, el.owner._id, el._id)));
  })
  .catch((err) => {
    console.log(err);
  });

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
getUserInfo(userNameWrap, userFieldOfActivityWrap, userAvatarWrap);

userAvatar.addEventListener('click', handleEditAvatarClick);
editAvatarPopupForm.addEventListener('submit', handleSaveAvatarClick);
deleteCardForm.addEventListener('submit', handleDeleteCardAccessClick)


