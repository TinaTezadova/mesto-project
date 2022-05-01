import { openPopup } from './modal';

const addNewCardPopup = document.querySelector('#addCard');
const cartItemTemplate = document.querySelector('#card-item-template').content;
const photoViewierPopup = document.querySelector('#photo-viewier');
const photoViewierImage = photoViewierPopup.querySelector('.photo-veiwier__image');
const photoViewierCaption = photoViewierPopup.querySelector('.photo-viewier__caption');


const handleCardLikeBtnClick = (event) => {
    event.target.classList.toggle('card-item__button_active')
  };
  
  const handleCardDeleteBtnClick = (event) => {
    event.target.closest('.card-item').remove();
  };
  
  const handleCardItemClick = (link, name) => {
    photoViewierImage.src = link;
    photoViewierImage.alt = name;
    photoViewierCaption.textContent = name;
    openPopup(photoViewierPopup)
  }

export function createCardsItem(name, link) {
    const cardItem = cartItemTemplate.querySelector('.card-item').cloneNode(true);
    const cardItemImg = cardItem.querySelector('.card-item__img');
    const cardName = cardItem.querySelector('.card-item__name');
    const likeBtn = cardItem.querySelector('#card-item__like-button');
    const deleteBtn = cardItem.querySelector('.card-item__button_type_delete-card');
  
    cardName.textContent = name;
    cardItemImg.src = link;
    cardItemImg.alt = name;
    likeBtn.addEventListener('click', handleCardLikeBtnClick);
  
    deleteBtn.addEventListener('click', handleCardDeleteBtnClick);
  
    cardItemImg.addEventListener('click', () => {
      handleCardItemClick(link, name)
    })
  
  
    return cardItem
  
  };
