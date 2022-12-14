import { useState, useEffect } from 'react';
import useViewport from '../../../hooks/useViewport';
import Card from '../MoviesCard/MoviesCard';
import ContainerWrapper from '../ContainerWrapper/ContainerWrapper';
import './MoviesCardList.css';

function MoviesCardList ({ cards, onLikeCard, onRemoveCard, savedMovies, pageName, nameIdCard }) {
  const { width } = useViewport();

  const [isMoreButton, setMoreButton] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState(5);

  const breakpoint = {
    sm: 630,
    md: 930,
    lg: 1280,
  };

  useEffect(() => {
    if (pageName === 'movies') {
      cards.length > numberOfCards ? setMoreButton(true) : setMoreButton(false);
    } else {
      setMoreButton(false);
    }
  }, [cards.length, pageName, numberOfCards])

  useEffect(() => {
    if (width < breakpoint.sm && cards.length >= 5) {
      setNumberOfCards(5);
    } else if (width < breakpoint.md && cards.length >= 8) {
      setNumberOfCards(8);
    } else if (width < breakpoint.lg && cards.length >= 12) {
      setNumberOfCards(12);
    } else if (width >= breakpoint.lg && cards.length >= 16){
      setNumberOfCards(16);
    } else {
      setNumberOfCards(cards.length);
    }
  }, [width, cards.length, breakpoint.sm, breakpoint.md, breakpoint.lg])

  function handleClickMoreButton () {
    setNumberOfCards((amount) => {
      if (width < breakpoint.sm) {
        return amount + 5;
      } else if (width < breakpoint.md) {
        return amount + 2;
      } else if (width < breakpoint.lg) {
        return amount + 3;
      } else if (width >= breakpoint.lg) {
        return amount + 4;
      }
    })
  }

  return (
    <ContainerWrapper className={"container-wrapper__color_black container-wrapper__type_grow"}>
      <section className="card-list" aria-label="Фильмы">
        <ul className="card-list__wrapper">
          {cards.length > 0 && (((pageName === 'saved-movies') && cards) || cards.slice(0, numberOfCards)).map((card) => (
            <Card
              key={card[nameIdCard]}
              card={card}
              onLikeCard={onLikeCard}
              onRemoveCard={onRemoveCard}
              savedMovies={savedMovies}
              pageName={pageName}
            />
          ))}
        </ul>
        {isMoreButton && <button className="card-list__more-button" onClick={handleClickMoreButton}>Ещё</button>}
      </section>
    </ContainerWrapper>
  );
}

export default MoviesCardList;
