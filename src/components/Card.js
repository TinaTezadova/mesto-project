export default class Card {
constructor(data, selector, handleCardLikeBtnClick, handleCardItemClick, handleCardDeleteBtnClick){
this.name = data.name;
this.link = data.link;
this.likes = data.likes;
this.ownerId = data.ownerId;
this.cardId = data.cardId;
this.userId = data.userId;
this._selector = selector;
this._setLikeCallback =  handleCardLikeBtnClick;
this._isLiked = !!this.likes.find((item) => item._id === this.userId);
this._handlerItemClick = handleCardItemClick;
this._handleCardDeleteBtnClick = handleCardDeleteBtnClick;
this._setLike = this._setLike.bind(this);
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
    this._handlerItemClick(this.link, this.name)
  });
  if(!this._deleteBtn.classList.contains('card-item__button_delete-unactive')) {
    this._deleteBtn.addEventListener('click', () => this._handleCardDeleteBtnClick(this.cardId))
  };
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
  if(this.ownerId !== this.userId){
    this._deleteBtn.classList.add('card-item__button_delete-unactive');
    
  }
  cardName.textContent = this.name;
  this.card.id = this.cardId
  this._cardItemImg.src =this.link;
  this._cardItemImg.alt = this.name;
  this._likeCount.textContent = this.likes.length;

  this._setEventListeners();
  return this.card;
}

}
