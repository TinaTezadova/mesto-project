export default class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) { 
            return res.json(); 
        } 
        return Promise.reject(`Ошибка: ${res.status}`); 
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, { 
            headers: this.headers 
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, { 
            headers: this.headers 
        })
        .then(this._checkResponse)
    }

    updateUserInfo({ name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH', headers: this.headers,
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(this._checkResponse)
    }

    createNewCard({ name, link }) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST', headers: this.headers,
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(this._checkResponse)
    }

    addLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`, { 
            method: 'PUT', 
            headers: this.headers 
        })
        .then(this._checkResponse)
    }

    removeLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`, { 
            method: 'DELETE', 
            headers: this.headers 
        })
        .then(this._checkResponse)
    }

    updateAvatar (avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH', headers: this.headers,
            body: JSON.stringify({
                avatar
            })
        })
        .then(this._checkResponse)
    }

    deleteCard (id) {
        return fetch(`${this.baseUrl}/cards/${id}`, { 
            method: 'DELETE', 
            headers: this.headers 
        })
        .then(this._checkResponse)
    }
}