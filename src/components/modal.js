const popups = document.querySelectorAll('.popup');

const closePopupWithEsc = (e, popup) => {
    if (e.key === 'Escape') {
        closePopup(popup)
    }
}

export function closePopup(popup) {
    document.removeEventListener('keydown', (e) => closePopupWithEsc(e, popup));
    popup.classList.remove('popup_open');
};

export function openPopup(popup) {
    document.addEventListener('keydown', (e) => closePopupWithEsc(e, popup));
    popup.classList.add('popup_open');
};



export const enableClosePopup = () => {
    popups.forEach((popup) => popup.addEventListener('click', () => closePopup(popup)));
}



export const handlePhotoViewierCloseBtnClick = () => {
    closePopup(photoViewierPopup)
  }