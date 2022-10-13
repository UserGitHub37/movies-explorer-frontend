import { useState, useEffect } from "react";
import "./MoviesCard.css";
import { convertMinsToHrsMins } from "../../../utils/utils";
const validator = require('validator');

function Card({ card, onLikeCard, savedMovies, pathname, onRemoveCard }) {
  const [buttonClassName, setButtonClassName] = useState("card__like-btn");

  const trailerLink = (() => {
    if (validator.isURL(card.trailerLink)) {
      return card.trailerLink;
    }
    return `https://api.nomoreparties.co/${card.image.url}`;
  })()

  useEffect(() => {
    const isSaved = savedMovies.some(
      (savedMovie) => savedMovie.movieId === card.id
    );

    if (isSaved) {
      setButtonClassName("card__like-btn card__like-btn_active");
    } else {
      setButtonClassName("card__like-btn");
    }
  }, [savedMovies, card]);

  function handleLikeClick() {
    onLikeCard({
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `https://api.nomoreparties.co/${card.image.url}`,
      trailerLink: trailerLink,
      thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
      movieId: card.id,
    });
  }

  function handleRemoveClick() {
    const cardId = card.movieId || card.id;
    onRemoveCard(cardId);
  }

  return (
    <li className="card">
      {pathname === "/movies" && (
        <>
          <div className="card__image-wrapper">
            <img
              src={`https://api.nomoreparties.co/${card.image.url}`}
              alt={card.nameRU}
              className="card__image"
            />
          </div>
          <div className="card__caption-wrapper">
            <h2 className="card__title">{card.nameRU}</h2>
            <button
              type="button"
              aria-label='Отметка "Сохранить"'
              className={buttonClassName}
              onClick={handleLikeClick}
            ></button>
          </div>
        </>
      )}

      {pathname === "/saved-movies" && (
        <>
          <div className="card__image-wrapper">
            <img
              src={card.image}
              alt={card.nameRU}
              className="card__image"
            />
          </div>
          <div className="card__caption-wrapper">
            <h2 className="card__title">{card.nameRU}</h2>
            <button
              type="button"
              aria-label="Кнопка 'Удалить'"
              className="card__remove-btn"
              onClick={handleRemoveClick}
            ></button>
          </div>
        </>
      )}

      <div className="card__movie-duration">{`${convertMinsToHrsMins(
        card.duration
      )}`}</div>
    </li>
  );
}

export default Card;
