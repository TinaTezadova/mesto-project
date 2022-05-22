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
            this.closePopup();
        }
    }
    handleOverlayClick(e) {
        if(e.target.classList.contains('popup_open')) {
            this.closePopup();
        }
    }
    setEventListeners() {
        const button = this._popup.querySelector('.popup__button');
        button.addEventListener('click', () => {
            this.closePopup();
        })
        this._popup.addEventListener('mousedown', this.handleOverlayClick.bind(this));
    }
}