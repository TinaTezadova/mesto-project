import { openPopup, deleteCardAccessPopupOpen } from './modal';
import { addLike, removeLike } from './api'

const cartItemTemplate = document.querySelector('#card-item-template').content;
const photoViewierPopup = document.querySelector('#photo-viewier');
const photoViewierImage = photoViewierPopup.querySelector('.photo-veiwier__image');
const photoViewierCaption = photoViewierPopup.querySelector('.photo-viewier__caption');
const deleteCardPopup = document.querySelector('#deleteCard');
export let deleteCardId;

const handleCardLikeBtnClick = (event) => {
  const cardItem = event.target.parentNode.parentNode.parentNode;
  const cardId = cardItem.id;
  const likeCount = cardItem.querySelector('.card-item__likes-count');
  if (event.target.classList.contains('card-item__button_active')) {
    removeLike(cardId)
      .then((result) => {
        event.target.classList.remove('card-item__button_active');
        likeCount.textContent = result.likes.length
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    addLike(cardId)
      .then((result) => {
        event.target.classList.add('card-item__button_active');
        likeCount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const handleCardDeleteBtnClick = (event) => {
  const cardItem = event.target.closest('.card-item');
  deleteCardId = cardItem.id;
  openPopup(deleteCardPopup);
};

const handleCardItemClick = (link, name) => {
  photoViewierImage.src = link;
  photoViewierImage.alt = name;
  photoViewierCaption.textContent = name;
  openPopup(photoViewierPopup)
}

export function createCardItem(name, link, likes, ownerId, cardId, userId) {
  const cardItem = cartItemTemplate.querySelector('.card-item').cloneNode(true);
  const cardItemImg = cardItem.querySelector('.card-item__img');
  const cardName = cardItem.querySelector('.card-item__name');
  const likeBtn = cardItem.querySelector('#card-item__like-button');
  const deleteBtn = cardItem.querySelector('.card-item__button_type_delete-card');
  const likeCount = cardItem.querySelector('.card-item__likes-count')

  cardName.textContent = name;
  cardItem.id = cardId
  cardItemImg.src = link;
  cardItemImg.alt = name;
  likeCount.textContent = likes;
  likeBtn.addEventListener('click', handleCardLikeBtnClick);



  cardItemImg.addEventListener('click', () => {
    handleCardItemClick(link, name)
  })
  if (ownerId !== userId) {
    deleteBtn.classList.add('card-item__button_delete-unactive');
  }
  else {
    deleteBtn.addEventListener('click', handleCardDeleteBtnClick);
  }


  return cardItem

};
