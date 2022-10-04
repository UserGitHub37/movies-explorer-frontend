import { useState } from 'react';
import './MoviesCard.css';

function Card ({card}) {
  const convertMinsToHrsMins = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    m = m < 10 ? '0' + m : m;
    return h + 'ч' + m + 'м';
  }

  const [buttonClassName, setButtonClassName] = useState("card__like-btn");

  function handleLikeClick() {
    if (buttonClassName.includes("card__like-btn_active")) {
      setButtonClassName("card__like-btn");
    } else {
      setButtonClassName("card__like-btn card__like-btn_active");
    }
  }

  return (
    <li className="card">
      <div className="card__image-wrapper">
        <img src={`https://api.nomoreparties.co/${card.image.url}`} alt={card.nameRU} className="card__image" />
      </div>
      <div className="card__caption-wrapper">
        <h2 className="card__title">{card.nameRU}</h2>
        <button type="button" aria-label='Отметка "Сохранить"' className={buttonClassName} onClick={handleLikeClick}></button>
      </div>
      <div className="card__movie-duration">{`${convertMinsToHrsMins(card.duration)} `}</div>
    </li>
  );
}

export default Card;
