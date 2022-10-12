import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm ({ name, onSearchMovies, onSetShortMovies }) {
  let location = useLocation();

  const [searchText, setSearchText] = useState('');
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setSearchText(() => {
      if (location.pathname === '/movies') {
        return localStorage.getItem('mainMoviesSearchText');
      } else if (location.pathname === '/saved-movies') {
        return localStorage.getItem('savedMoviesSearchText');
      }
      return '';
    });

    setChecked(() => {
      if (location.pathname === '/movies') {
        return localStorage.getItem('isShortMainMovies') === 'true';
      } else if (location.pathname === '/saved-movies') {
        return localStorage.getItem('isShortSavedMovies') === 'true';
      }
      return false;
    });

    setErrorMessage('');
  }, [location.pathname])

  function handleChangeSearchText (e) {
    setSearchText(e.target.value);
  }

  function onSubmit (e) {
    e.preventDefault();
    onSearchMovies(searchText);
    if (!searchText) {
      setErrorMessage('Нужно ввести ключевое слово');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
  }

  function handleChangeCheckbox () {
    onSetShortMovies(!checked);
    setChecked((checked) => !checked);
  }

  return (
    <form className="search-form" action="#" name={name} onSubmit={onSubmit}>
      <fieldset className="search-form__input-fieldset">
        <input className="search-form__input" type="text" name="movies" placeholder="Фильм" value={searchText ? searchText : ''} onChange={handleChangeSearchText}/>
        <button type="submit" className="search-form__submit-btn">Поиск</button>
      </fieldset>
      <span className="search-form__error-text">{errorMessage}</span>
      <fieldset className="search-form__checkbox-fieldset">
        <label className="search-form__checkbox-label">
          <input type="checkbox" name="short-movies" className="search-form__checkbox" checked={checked} onChange={handleChangeCheckbox} />
          <span className="search-form__pseudo-item"></span>
          <span className="search-form__label-text">Короткометражки</span>
        </label>
      </fieldset>
    </form>
  );
}

export default SearchForm;
