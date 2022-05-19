import './index.css';
import FormValidator from '../components/FormValidator';
import Card from '../components/Card';
import Section from '../components/Section';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo';
import { config, formSelectors, cardItemSelector, cardsContainerSelector, userInfoSelectors } from '../utils/constants';

const editProfilePopup = document.querySelector('#editProfile');
const editProfileBtn = document.querySelector('.profile__button_type_edit-profile');
const closeEditProfileBtn = document.querySelector('.popup__button');
const userNameFromPopup = editProfilePopup.querySelector('#userName');
const userFieldOfActivityFromPopup = editProfilePopup.querySelector('#user-field-of-activity');
const addNewCardPopup = document.querySelector('#addCard');
const addNewCardBtn = document.querySelector('.profile__button_type_add');
const closeAddCardBtn = addNewCardPopup.querySelector('#addCardPopupBtn');
const userAvatar = document.querySelector('.profile__avatar-wrapper');
let deleteCardId;
const newCardForm = new FormValidator(formSelectors, '#addNewCardForm');
const updateProfileForm = new FormValidator(formSelectors, '#updateProfileForm');
const updateAvatarForm = new FormValidator(formSelectors, '#updateAvatarForm');
const userInfo = new UserInfo(userInfoSelectors);
const api = new Api(config)

const addNewCard = (event, values) => {
  const name = values[0];
  const link = values[1];
  event.preventDefault();
  api.createNewCard({
    name,
    link,
  })
    .then((result) => {
      cardsSection.addItem(result);
      addCardPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    });

};

function saveEditForm(event, values) {
  const name = values[0];
  const about = values[1];
  event.preventDefault();
  api.updateUserInfo({
    name,
    about,
  })
    .then((result) => {
      userInfo.setUserInfo(result);
      updateProfilePopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleSaveAvatarClick = (e, newAvatarSrc) => {
  e.preventDefault();
  api.updateAvatar(newAvatarSrc[0])
    .then(({ avatar }) => {
      userInfo.setAvatar(avatar);
      updateAvatarPopup.closePopup();
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
      confirmDeletePopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    });

}

const handleCloseEditProfileBtnClick = () => {
  updateProfilePopup.closePopup()
};

const setEditProfileForm = ({ name, about }) => {
  userNameFromPopup.value = name;
  userFieldOfActivityFromPopup.value = about;
}

const handleEditProfileBtnClick = () => {
  setEditProfileForm(userInfo.getUserInfo());
  updateProfilePopup.openPopup();
};


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
  photoViewierModal.openPopup(name, link)
};

const handleCardDeleteBtnClick = (cardId) => {
  deleteCardId = cardId;
  confirmDeletePopup.openPopup();
};

const addCardPopup = new PopupWithForm('#addCard', addNewCard);
const updateProfilePopup = new PopupWithForm('#editProfile', saveEditForm);
const updateAvatarPopup = new PopupWithForm('#editAvatar', handleSaveAvatarClick);
const photoViewierModal = new PopupWithImage('#photo-viewier');
const confirmDeletePopup = new PopupWithForm('#deleteCard', handleDeleteCardAccessClick);

const cardsRenderer = (card) => {
  return new Card(
    {
      name: card.name,
      link: card.link,
      likes: card.likes,
      ownerId: card.owner._id,
      cardId: card._id,
      userId: userInfo.getUserId(),
    },
    cardItemSelector,
    handleCardLikeBtnClick,
    handleCardItemClick,
    handleCardDeleteBtnClick

  ).createCard()
}
const cardsSection = new Section({ items: [], renderer: cardsRenderer }, cardsContainerSelector)



const handleAddNewCardBtnClick = () => {
  addNewCardPopup.querySelector('.edit-form__button').classList.add('edit-form__button_disabled')
  addCardPopup.openPopup()
};

const handleCloseAddCardBtnClick = () => {
  addCardPopup.closePopup()
};

const handleEditAvatarClick = () => {
  updateAvatarPopup.openPopup()
};

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then((values) => {
    const userData = values[0];
    const cardsInfo = values[1];
    userInfo.setUserInfo(userData);
    cardsSection.setItems(cardsInfo);

  })
  .catch((err) => {
    console.log(err);
  })



editProfileBtn.addEventListener('click', handleEditProfileBtnClick);

closeEditProfileBtn.addEventListener('click', handleCloseEditProfileBtnClick);

addNewCardBtn.addEventListener('click', handleAddNewCardBtnClick);

closeAddCardBtn.addEventListener('click', handleCloseAddCardBtnClick);

userAvatar.addEventListener('click', handleEditAvatarClick);

newCardForm.enableValidation();
updateProfileForm.enableValidation();
updateAvatarForm.enableValidation();
cardsSection.renderItems();

photoViewierModal.setEventListeners();
addCardPopup.setEventListeners();
updateProfilePopup.setEventListeners();
updateAvatarPopup.setEventListeners();
confirmDeletePopup.setEventListeners();


