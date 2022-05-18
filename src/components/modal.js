const popups = document.querySelectorAll('.popup');
const photoViewierPopup = document.querySelector('#photo-viewier');

export default class Popup {
    constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
    }
    openPopup() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);
    }
    closePopup() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.closePopup()
        }
    }
    handleOverlayClick(e) {
        if(e.target.classList.contains('popup_open')) {
            this.closePopup()
        }
    }
    setEventListeners() {
        const button = this._popup.querySelector('.popup__button');
        button.addEventListener('click', () => {
            this.closePopup()
        })
        this._popup.addEventListener('click', this.handleOverlayClick.bind(this))
    }
}

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