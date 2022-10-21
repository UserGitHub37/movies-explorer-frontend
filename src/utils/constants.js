//Мой API с регистрацией, авторизацией и сохраненными фильмами пользователей
//export const MAIN_API_BASE_URL = 'http://localhost:3000/';
export const MAIN_API_BASE_URL = 'https://api.movies.thirtyseven.nomoredomains.sbs/';


//Сторонний API с базой фильмов
export const MOVIES_API_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies/';

export const SEARCH_ERRORS = {
  NOT_FOUND: 'Ничего не найдено',
  SERVER_IS_NOT_AVAILABLE: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
}

export const nameRegExp = '[A-Za-zА-Яа-яЁё-]+[A-Za-zА-Яа-яЁё\s-]*[A-Za-zА-Яа-яЁё-]*';

export const emailRegExp = '[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.+.[A-Za-z]{2,4}';
