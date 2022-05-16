export default class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, { 
            headers: this.headers 
        })
        .then(res => { 
            if (res.ok) { 
                return res.json(); 
            } 
            return Promise.reject(`Ошибка: ${res.status}`); 
        })
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, { 
            headers: this.headers 
        })
        .then(res => { 
            if (res.ok) { 
                return res.json(); 
            } 
            return Promise.reject(`Ошибка: ${res.status}`); 
        })
    }

    updateUserInfo({ name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH', headers: this.headers,
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(res => { 
            if (res.ok) { 
                return res.json(); 
            } 
            return Promise.reject(`Ошибка: ${res.status}`); 
        })
    }

    createNewCard({ name, link }) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST', headers: this.headers,
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(res => { 
            if (res.ok) { 
                return res.json(); 
            } 
            return Promise.reject(`Ошибка: ${res.status}`); 
        })
    }

    addLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`, { 
            method: 'PUT', 
            headers: this.headers 
        })
        .then(res => { 
            if (res.ok) { 
                return res.json(); 
            } 
            return Promise.reject(`Ошибка: ${res.status}`); 
        })
    }

    removeLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`, { 
            method: 'DELETE', 
            headers: this.headers 
        })
        .then(res => { 
            if (res.ok) { 
                return res.json(); 
            } 
            return Promise.reject(`Ошибка: ${res.status}`); 
        })
    }

    updateAvatar (avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH', headers: this.headers,
            body: JSON.stringify({
                avatar
            })
        })
        .then(res => { 
            if (res.ok) { 
                return res.json(); 
            } 
            return Promise.reject(`Ошибка: ${res.status}`); 
        })
    }

    deleteCard (id) {
        return fetch(`${this.baseUrl}/cards/${id}`, { 
            method: 'DELETE', 
            headers: this.headers 
        })
        .then(res => { 
            if (res.ok) { 
                return res.json(); 
            } 
            return Promise.reject(`Ошибка: ${res.status}`); 
        })
    }
}