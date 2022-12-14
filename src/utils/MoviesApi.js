const {
  MOVIES_API_BASE_URL,
} = require('./constants');

class MoviesApi {
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

  getMoviesList() {
    return fetch(this._baseUrl, {
        method: 'GET',
        headers: this._headers
    }).then(this._checkPromise);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default moviesApi;
