import './index.css';
import FormValidator from '../components/FormValidator';
import Card from '../components/Card';
import Section from '../components/Section';
import { openPopup, closePopup, enableClosePopup, handlePhotoViewierCloseBtnClick } from '../components/modal';
import Api from '../components/Api';
import { config, formSelectors, cardItemSelector,  cardsContainerSelector} from '../utils/constants';

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
const photoViewierCaption = photoViewierPopup.querySelector('.photo-viewier__caption');
const photoViewierImage = photoViewierPopup.querySelector('.photo-veiwier__image');
let currentUserId;
let deleteCardId;
const newCardForm = new FormValidator(formSelectors, '#addNewCardForm');
const updateProfileForm = new FormValidator(formSelectors, '#updateProfileForm');
const updateAvatarForm = new FormValidator(formSelectors, '#updateAvatarForm');


const api = new Api(config)

const changePopupBtnText = (popup, text) => {
  const button = popup.querySelector('.edit-form__button');
  button.textContent = text;
}

function saveEditForm(event, params) {
  event.preventDefault();
  changePopupBtnText(editProfilePopup, 'Сохранение...');
  api.updateUserInfo({
    name: params.userNameFromPopup.value,
    about: params.userFieldOfActivityFromPopup.value
  })
    .then((result) => {
      params.userNameFromProfile.textContent = result.name;
      params.userFieldOfActivityFromProfile.textContent = result.about;
      closePopup(params.editProfilePopup);
    })
    .finally(() => {
      changePopupBtnText(editProfilePopup, 'Сохранить')
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

const handleCardLikeBtnClick = (cardId, isLiked, setLike) => {
  if (isLiked) {
    api.removeLike(cardId)
      .then((result) => {
        setLike(result.likes.length)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    api.addLike(cardId)
      .then((result) => {
        setLike(result.likes.length)
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const handleCardItemClick = (link, name) => {
  photoViewierImage.src = link;
  photoViewierImage.alt = name;
  photoViewierCaption.textContent = name;
  openPopup(photoViewierPopup)
};

const handleCardDeleteBtnClick = (cardId) => {
  deleteCardId = cardId;
  openPopup(deleteCardPopup);
};

const cardsRenderer = (card) => {
  return new Card(
    { name: card.name,
      link: card.link,
      likes: card.likes,
      ownerId: card.owner._id,
      cardId: card._id,
      userId: currentUserId
    },
    cardItemSelector,
    handleCardLikeBtnClick,
    handleCardItemClick,
    handleCardDeleteBtnClick

  ).createCard()
}
const cardsSection = new Section({items: [], renderer: cardsRenderer}, cardsContainerSelector)

const addNewCard = (event, cardsContainer, addNewCardForm) => {
  event.preventDefault();
  changePopupBtnText(addNewCardPopup, 'Сохранение...');
  api.createNewCard({
    name: cardName.value,
    link: cardLink.value
  })
    .then((result) => {
      cardsSection.addItem(result);
      closePopup(addNewCardPopup);
      newCardForm.resetForm()
    })
    .finally(() => {
      changePopupBtnText(addNewCardPopup, 'Создать');
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
  changePopupBtnText(editAvatarPopup, 'Сохранение...');
  const avatar = editAvatarPopup.querySelector('.edit-form__input').value;
  const form = editAvatarPopup.querySelector('.edit-form');
  api.updateAvatar(avatar)
    .then((result) => {
      userAvatarWrap.src = result.avatar;
      closePopup(editAvatarPopup);
      updateAvatarForm.resetForm();
    })
    .finally(() => {
      changePopupBtnText(editAvatarPopup, 'Сохранить');
    })
    .catch((err) => {
      console.log(err);
    });
}

const handleDeleteCardAccessClick = (e) => {
  e.preventDefault();
  const cardItem = document.getElementById(`${deleteCardId}`);
  api.deleteCard(deleteCardId)
    .then((result) => {
      cardItem.remove();
      closePopup(deleteCardPopup)
    })
    .catch((err) => {
      console.log(err);
    });

}



Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then((values) => {
    const userInfo = values[0];
    const cardsInfo = values[1];
    currentUserId = userInfo._id;
    userNameWrap.textContent = userInfo.name;
    userFieldOfActivityWrap.textContent = userInfo.about;
    userAvatarWrap.src = userInfo.avatar;
    cardsSection.setItems(cardsInfo);

  })
  .catch((err) => {
    console.log(err);
  })



editProfileBtn.addEventListener('click', handleEditProfileBtnClick);

closeEditProfileBtn.addEventListener('click', handleCloseEditProfileBtnClick);

editProfileForm.addEventListener('submit', hanleSaveEditForm);

addNewCardBtn.addEventListener('click', handleAddNewCardBtnClick);

closeAddCardBtn.addEventListener('click', handleCloseAddCardBtnClick)

addNewCardForm.addEventListener('submit', (e) => addNewCard(e, cardsContainer, addNewCardForm));

photoViewierCloseBtn.addEventListener('click', handlePhotoViewierCloseBtnClick);
newCardForm.enableValidation();
updateProfileForm.enableValidation();
updateAvatarForm.enableValidation();
cardsSection.renderItems();

enableClosePopup();

userAvatar.addEventListener('click', handleEditAvatarClick);
editAvatarPopupForm.addEventListener('submit', handleSaveAvatarClick);
deleteCardForm.addEventListener('submit', handleDeleteCardAccessClick);
photoViewierPopup.querySelector('.photo-viewier').addEventListener('click', (e) => e.stopPropagation())


