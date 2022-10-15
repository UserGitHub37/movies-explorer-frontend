import { useEffect, useState } from 'react';
import ContainerWrapper from '../ContainerWrapper/ContainerWrapper';
import './SearchForm.css';

function SearchForm ({ pageName, onSearchMovies }) {
  const [errorMessage, setErrorMessage] = useState('');

  const [searchText, setSearchText] = useState(() => {
    if (pageName === 'movies') {
      return localStorage.getItem('mainMoviesSearchText');
    }
    return '';
  });

  const [checked, setChecked] = useState(() => {
    if (pageName === 'movies') {
      return localStorage.getItem('isShortMainMovies') === 'true';
    }
    return false;
  });

  useEffect(() => {
    setSearchText(() => {
      if (pageName === 'movies') {
        return localStorage.getItem('mainMoviesSearchText');
      }
      return '';
    });

    setChecked(() => {
      if (pageName === 'movies') {
        return localStorage.getItem('isShortMainMovies') === 'true';
      }
      return false;
    });

    setErrorMessage('');
  }, [pageName])

  function handleChangeSearchText (e) {
    setSearchText(e.target.value);
  }

  function onSubmit (e) {
    e.preventDefault();
    if (!searchText) {
      setErrorMessage('Нужно ввести ключевое слово');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    } else {
      onSearchMovies(pageName, checked, searchText);
    }
  }

  function handleChangeCheckbox () {
    localStorage.setItem('isShortMainMovies', JSON.stringify(!checked));
    onSearchMovies(pageName, !checked, searchText);
    setChecked((checked) => !checked);
  }

  return (
    <ContainerWrapper className={"container-wrapper__color_black"}>
      <form className="search-form" action="#" name={`${pageName}-form`} onSubmit={onSubmit}>
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
    </ContainerWrapper>
  );
}

export default SearchForm;
