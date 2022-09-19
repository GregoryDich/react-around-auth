class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
    addLike(card) {
      return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }
    removeLike(card) {
      return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }
    editAvatar(values) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: values.avatar,
        }),
      }).then((res) => this._checkResponse(res));
    }
    editProfile(values) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: values.name,
          about: values.about,
        }),
      }).then((res) => this._checkResponse(res));
    }
    changeLikeCardStatus(isLiked, card) {
      return isLiked ? this.removeLike(card) : this.addLike(card);
    } 
    deleteCard(card) {
      return fetch(`${this._baseUrl}/cards/${card._id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }
    addCard(values) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: values.place,
          link: values.url,
        }),
      }).then((res) => this._checkResponse(res));
    }
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  }
  
  const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
    headers: {
      authorization: "545ebbe5-83ef-479f-9e3a-79ad4591aa10",
      "Content-Type": "application/json",
    },
  });

  export default api;