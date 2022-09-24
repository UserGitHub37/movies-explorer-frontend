import './SearchForm.css';

function SearchForm ({ name, onSubmit }) {

  return (
    <form className="search-form" action="#" name={name} onSubmit={onSubmit}>
      <fieldset className="search-form__input-fieldset">
        <input className="search-form__input" type="text" name="movies" placeholder="Фильм" required />
        <button type="submit" className="search-form__submit-btn">Поиск</button>
      </fieldset>
      <fieldset className="search-form__checkbox-fieldset">
        <label className="search-form__checkbox-label">
          <input type="checkbox" name="short-films" className="search-form__checkbox" />
          <span className="search-form__pseudo-item"></span>
          <span className="search-form__label-text">Короткометражки</span>
        </label>
      </fieldset>
    </form>
  );
}

export default SearchForm;
