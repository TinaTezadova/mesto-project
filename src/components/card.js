import { openPopup, deleteCardAccessPopupOpen } from './modal';
import Api from './api';
import { config } from '../utils/constants';

const cartItemTemplate = document.querySelector('#card-item-template').content;
const photoViewierPopup = document.querySelector('#photo-viewier');
const photoViewierImage = photoViewierPopup.querySelector('.photo-veiwier__image');
const photoViewierCaption = photoViewierPopup.querySelector('.photo-viewier__caption');
const deleteCardPopup = document.querySelector('#deleteCard');
const api = new Api(config);
export let deleteCardId;

const handleCardLikeBtnClick = (event) => {
  const cardItem = event.target.parentNode.parentNode.parentNode;
  const cardId = cardItem.id;
  const likeCount = cardItem.querySelector('.card-item__likes-count');
  if (event.target.classList.contains('card-item__button_active')) {
    api.removeLike(cardId)
      .then((result) => {
        event.target.classList.remove('card-item__button_active');
        likeCount.textContent = result.likes.length
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    api.addLike(cardId)
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

class Card {
constructor(data, selector, setLikeCallback, handlerItemClick){
this.name = data.name;
this.link = data.link;
this.likes = data.likes;
this.ownerId = data.ownerId;
this.cardId = data.cardId;
this.userId = data.userId;
this._selector = selector;
this._setLikeCallback =  setLikeCallback;
this._isLiked = !!likes.find(item => {item._id === this.userId});
this._handlerItemClick =handlerItemClick
}
_getElement() {
  const cardItem = document.querySelector(this._selector).content.querySelector('.card-item').cloneNode(true);
  return cardItem
}

_setEventListeners() {
  this._likeBtn.addEventListener('click',() => {
    this._setLikeCallback(this.cardId, this._isLiked, this._setLike)
  });
  this._cardItemImg.addEventListener('click',() => {
    this._handlerItemClick(this.name, this.link)
  });
}

_setLike(likes){
  this._isLiked = !this._isLiked;
  this._likeCount.textContent = likes
  this._toggleLikeButton()
}

_toggleLikeButton() {
  this._likeBtn.classList.toggle('card-item__button_active');
}

createCard() {
  this.card = this._getElement()
  this._cardItemImg = this.card.querySelector('.card-item__img');
  const cardName = this.card.querySelector('.card-item__name');
  this._likeBtn = this.card.querySelector('#card-item__like-button');
  this._deleteBtn = this.card.querySelector('.card-item__button_type_delete-card');
  this._likeCount = this.card.querySelector('.card-item__likes-count')
  if(this._isLiked) {
    this._toggleLikeButton()
  }
  if(this.ownerId){
    
  }
  cardName.textContent = this.name;
  this.card.id = this.cardId
  this._cardItemImg.src =this.link;
  this._cardItemImg.alt = this.name;
  likeCount.textContent = this.likes.length;
}

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
