class MainApi {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkPromise(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
        method: 'GET',
        headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('token')}`},
    }).then(this._checkPromise);
  }

  register(data) {
    return fetch(`${this._baseUrl}signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data),
    }).then(this._checkPromise);
  }

  authorize(data) {
    return fetch(`${this._baseUrl}signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data),
    }).then(this._checkPromise);
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
        method: 'PATCH',
        headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('token')}`},
        body: JSON.stringify(data),
    }).then(this._checkPromise);
  }

  getSavedMoviesList() {
    return fetch(`${this._baseUrl}movies`, {
      method: 'GET',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('token')}`},
    }).then(this._checkPromise);
  }

  saveMovie(card) {
    return fetch(`${this._baseUrl}movies`, {
      method: 'POST',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify(card),
    }).then(this._checkPromise);
  }

  removeSavedMovie(movieId) {
    return fetch(`${this._baseUrl}movies/${movieId}`, {
        method: 'DELETE',
        headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('token')}`},
    }).then(this._checkPromise);
  }

}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default mainApi;
