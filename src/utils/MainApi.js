class MainApi {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkPromise(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  checkToken() {
    return fetch(`${this._baseUrl}auth`, {
        method: 'GET',
        headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('token')}`},
    });
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

}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default mainApi;
