class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
  
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    _request(url, options) {
        return fetch(this._baseUrl + url, options)
        .then(this._checkResponse)
    }

    getCards() {
        return this._request('/cards', {headers: this._headers})
    }

    postCard({name, link}) {
        return this._request('/cards', {
            method: 'POST',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
    }

    patchAvatar(link) {
        return this._request('/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        })
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this._request(`/cards/${id}/likes`, {
                method: 'PUT',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': 'application/json'
                }
            })
        } else {
            return this._request(`/cards/${id}/likes`, {
                method: 'DELETE',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    deleteCard(id) {
        return this._request(`/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
        })
    }

    getUserInfo() {
        return this._request('/users/me', {headers: this._headers})
    }

    patchUserInfo({name, about}) {
        return this._request('/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
    headers: {
      authorization: 'b14febf0-0b28-4e38-a9e1-9974acb9fa00'
    }
  });

export default api;