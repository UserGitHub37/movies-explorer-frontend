//Мой API с регистрацией, авторизацией и сохраненными фильмами пользователей
// export const MAIN_API_BASE_URL = 'http://localhost:3000/';
export const MAIN_API_BASE_URL = 'https://api.movies.thirtyseven.nomoredomains.sbs/';


//Сторонний API с базой фильмов
export const MOVIES_API_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies/';

export const SEARCH_ERRORS = {
  NOT_FOUND: 'Ничего не найдено',
  SERVER_IS_NOT_AVAILABLE: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
}

export const STATUS_CODE = {
  UNAUTHORIZED: 401,
}

// Регулярные выражения для подстановки в атрибуты инпутов "pattern" (тут есть свои особенности)
// "\\s" так отлавливаем пробельные символы
// "\\." так отлавливаем точку
// одним слешем тут не обойдешься
export const nameRegExp = '[A-Za-zА-Яа-яЁё-]+[A-Za-zА-Яа-яЁё\\s-]*[A-Za-zА-Яа-яЁё-]*';
export const emailRegExp = '([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\\.[a-z]{2,})';
