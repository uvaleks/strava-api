class Api {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
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

    getAthleteInfo(endpoint, accessToken) {
            return this._request(endpoint, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + accessToken,
                }
            })
    }

    getAthleteStats(endpoint, athleteId, accessToken) {
            return this._request(`${endpoint}s/${athleteId}/stats`, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + accessToken,
                }
            })
    }

    getActivities(endpoint, accessToken) {
        return this._request(`${endpoint}/activities`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + accessToken,
            }
        })
    }

    getActivityById(endpoint, accessToken, activityId) {
        return this._request(`${endpoint}/activities/${activityId}`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + accessToken,
            }
        })
    }

    getAccessToken(endpoint, clientId, clientSecret, authorizationCode) {
        return this._request(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: authorizationCode,
                grant_type: 'authorization_code'
            })
        })
    }

    getNewAccessToken(endpoint, clientId, clientSecret, refreshToken) {
        return this._request(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            })
        })
    }

    // getCards() {
    //     return this._request('/cards', {headers: this._headers})
    // }

    // postCard({name, link}) {
    //     return this._request('/cards', {
    //         method: 'POST',
    //         headers: {
    //             authorization: this._headers.authorization,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             name: name,
    //             link: link
    //         })
    //     })
    // }

    // patchAvatar(link) {
    //     return this._request('/users/me/avatar', {
    //         method: 'PATCH',
    //         headers: {
    //             authorization: this._headers.authorization,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             avatar: link
    //         })
    //     })
    // }

    // changeLikeCardStatus(id, isLiked) {
    //     if (isLiked) {
    //         return this._request(`/cards/${id}/likes`, {
    //             method: 'PUT',
    //             headers: {
    //                 authorization: this._headers.authorization,
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //     } else {
    //         return this._request(`/cards/${id}/likes`, {
    //             method: 'DELETE',
    //             headers: {
    //                 authorization: this._headers.authorization,
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //     }
    // }

    // deleteCard(id) {
    //     return this._request(`/cards/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             authorization: this._headers.authorization,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    // }

    // getUserInfo() {
    //     return this._request('/users/me', {headers: this._headers})
    // }

    // patchUserInfo({name, about}) {
    //     return this._request('/users/me', {
    //         method: 'PATCH',
    //         headers: {
    //             authorization: this._headers.authorization,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             name: name,
    //             about: about
    //         })
    //     })
    // }
}

const api = new Api({
    baseUrl: 'https://www.strava.com'
  });

export default api;