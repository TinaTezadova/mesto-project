const popups = document.querySelectorAll('.popup');
const photoViewierPopup = document.querySelector('#photo-viewier');

const closePopupWithEsc = (e) => {
    if (e.key === 'Escape') {
        const popupActive = document.querySelector('.popup_open');
        closePopup(popupActive)
    }
}

const handleEscClose = closePopupWithEsc.bind()

export function closePopup(popup) {
    document.removeEventListener('keydown', handleEscClose);
    popup.classList.remove('popup_open');
};

export function openPopup(popup) {
    document.addEventListener('keydown', handleEscClose);
    popup.classList.add('popup_open');
};



export const enableClosePopup = () => {
    popups.forEach((popup) => popup.addEventListener('click', () => closePopup(popup)));
}



export const handlePhotoViewierCloseBtnClick = () => {
    closePopup(photoViewierPopup)
}