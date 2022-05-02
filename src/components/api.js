export const myId = '2db01ba02817beb6216f1735';
const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
    headers: {
        authorization: '200c38ce-1a1c-4131-9fd9-c0901ac5e0ba',
        'Content-Type': 'application/json'
    }
};

export const getUserInfo = (userNameWrap, userFieldOfActivityWrap, userAvatarWrap) => {
    return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            userNameWrap.textContent = result.name;
            userFieldOfActivityWrap.textContent = result.about;
            userAvatarWrap.src = result.avatar
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
};

export const updateUserInfo = ({ name, about }) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH', headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
};

export const createNewCard = ({ name, link }) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST', headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    })
}

export const addLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, { method: 'PUT', headers: config.headers })
};

export const removeLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, { method: 'DELETE', headers: config.headers })
};

export const updateAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH', headers: config.headers,
        body: JSON.stringify({
            avatar
        })
    })
};

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, { method: 'DELETE', headers: config.headers })
};