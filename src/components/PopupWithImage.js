import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this._popup.querySelector('.photo-veiwier__image');
    this._caption = this._popup.querySelector('.photo-viewier__caption');
  }
  openPopup(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.openPopup();
  }
}