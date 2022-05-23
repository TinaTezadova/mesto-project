export default class UserInfo {
  constructor({
    nameSelector,
    aboutSelector,
    avatarSelector
  }) {
    this._nameContainer = document.querySelector(nameSelector);
    this._aboutContainer = document.querySelector(aboutSelector);
    this._userId = null;
    this._avatarContainer = document.querySelector(avatarSelector);
  }
  
  getUserInfo() {
    return {
      name: this._nameContainer.textContent,
      about: this._aboutContainer.textContent
    }
  }

  setAvatar(url) {
    this._avatarContainer.src = url;
  }

  setUserInfo(data) {
    this._nameContainer.textContent = data.name;
    this._aboutContainer.textContent = data.about;
    this._userId = data._id;
    this.setAvatar(data.avatar);
  }

  getUserId() {
    return this._userId;
  }
}