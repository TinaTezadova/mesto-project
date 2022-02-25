const editProfilePopup = document.querySelector('#editProfile');
const editProfileBtn = document.querySelector('.profile__button_type_edit-profile');
const closeEditProfileBtn = document.querySelector('.popup__button');
const userNameFromPopup = editProfilePopup.querySelector('#userName');
const userNameFromProfile = document.querySelector('.profile__name');
const userFieldOfActivityFromPopup = editProfilePopup.querySelector('#user-field-of-activity');
const userFieldOfActivityFromProfile = document.querySelector('.profile__field-of-activity');
const form = editProfilePopup.querySelector('.edit-form');
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

const cardsContainer = document.querySelector('.cards-container');
const cartItemTemplate = document.querySelector('#card-item-template').content;
const addNewCardPopup = document.querySelector('#addCard');
const addNewCardBtn = document.querySelector('.profile__button_type_add');
const closeAddCardBtn = addNewCardPopup.querySelector('#addCardPopupBtn');
const saveNewCardBtn = addNewCardPopup.querySelector('.edit-form__button');
const cardName = addNewCardPopup.querySelector('#card-name');
const cardLink = addNewCardPopup.querySelector('#card-link');
const addNewCardForm = addNewCardPopup.querySelector('.edit-form');
const addNewCardPopupInputs = Array.from(addNewCardPopup.querySelectorAll('.edit-form__input'));
const photoViewierPopup = document.querySelector('#photo-viewier');
const photoViewierImage = photoViewierPopup.querySelector('.photo-veiwier__image');
const photoViewierCaption = photoViewierPopup.querySelector('.photo-viewier__caption');
const photoViewierCloseBtn = photoViewierPopup.querySelector('#photo-viewier-close-btn');





function openPopup(popup) {
  popup.classList.add('popup_open');
};

function closePopup(popup) {
  popup.classList.remove('popup_open');
};

function saveEditForm (event) {
  event.preventDefault();
  userNameFromProfile.textContent = userNameFromPopup.value;
  userFieldOfActivityFromProfile.textContent = userFieldOfActivityFromPopup.value;
  closePopup(editProfilePopup)
};

function createCardsItem (name, link) {
  const cardItem = cartItemTemplate.querySelector('.card-item').cloneNode(true);
  const cardItemImg = cardItem.querySelector('.card-item__img');
  const cardName = cardItem.querySelector('.card-item__name');
  const likeBtn = cardItem.querySelector('#card-item__like-button');
  const deleteBtn = cardItem.querySelector('.card-item__button_type_delete-card');

  cardName.textContent = name;
  cardItemImg.setAttribute('src', link);
  cardItemImg.setAttribute('alt', name);
  likeBtn.addEventListener('click', (event) => {
    event.target.classList.toggle('card-item__button_active')
  });

  deleteBtn.addEventListener('click', (event) => {
    event.target.closest('.card-item').remove();
  });

  cardItemImg.addEventListener('click', () => {
    photoViewierImage.setAttribute('src', link);
    photoViewierImage.setAttribute('alt', name);
    photoViewierCaption.textContent = name;
    openPopup(photoViewierPopup)
  })


  return cardItem

};

const resetInputsValue = () => {
  addNewCardPopupInputs.forEach((item) => {
    item.value = ''
  })
}

const addNewCard = (event) => {
  event.preventDefault();
  cardsContainer.prepend(createCardsItem(cardName.value, cardLink.value));
  closePopup(addNewCardPopup);
  resetInputsValue()
};

editProfileBtn.addEventListener('click', () => {
  openPopup(editProfilePopup);
  userNameFromPopup.value = userNameFromProfile.textContent;
  userFieldOfActivityFromPopup.value = userFieldOfActivityFromProfile.textContent;
});

closeEditProfileBtn.addEventListener('click', () => {
  closePopup(editProfilePopup)
});

form.addEventListener('submit', saveEditForm);

initialCards.forEach(el => cardsContainer.append(createCardsItem(el.name, el.link)));

addNewCardBtn.addEventListener('click', () => {
  openPopup(addNewCardPopup)
});

closeAddCardBtn.addEventListener('click', () => {
  closePopup(addNewCardPopup)
})

addNewCardForm.addEventListener('submit', addNewCard);

photoViewierCloseBtn.addEventListener('click', () => {
  closePopup(photoViewierPopup)
})
