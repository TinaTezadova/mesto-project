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
      profession: this._aboutContainer.textContent
    }
  }
  setUserInfo(data) {
    this._nameContainer.textContent = data.name;
    this._aboutContainer.textContent = data.about;
    this._userId = data._id;
    this._avatarContainer.src = data.avatar;
  }
  getUserId() {
    return this._userId;
  }
}