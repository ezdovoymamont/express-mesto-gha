class Api {
    constructor(baseUrl, headers) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._headers
            }
        })
            .then(this._checkError);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._headers
            }
        })
            .then(this._checkError);
    }

    updateProfile(user) {
        return fetch(`${this._baseUrl}/users/me`, {

            method: 'PATCH',
            headers: {
                authorization: this._headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(this._checkError);
    }

    updatePhotoProfile(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar `, {

            method: 'PATCH',
            headers: {
                authorization: this._headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avatar)
        })
            .then(this._checkError);
    }

    addNewCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
        })
            .then(this._checkError);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers
            }
        })
            .then(this._checkError);
    }

    putLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._headers
            }
        })
            .then(this._checkError);
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers
            }
        })
            .then(this._checkError);
    }
}

const api = new Api('https://api.garry.students.nomoredomains.icu', 'c667b9e8-d609-4570-8d24-855bf53da70e');

export default api;
