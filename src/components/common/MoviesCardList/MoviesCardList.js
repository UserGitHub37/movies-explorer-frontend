import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useViewport from '../../../hooks/useViewport';
import Card from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList ({ cards }) {
  let location = useLocation();
  const { width } = useViewport();

  const [isMoreButton, setMoreButton] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState(5);

  const breakpoint = {
    sm: 630,
    md: 930,
    lg: 1280,
  };

  useEffect(() => {
    if (location.pathname === '/movies') {
      cards.length > numberOfCards ? setMoreButton(true) : setMoreButton(false);
    } else {
      setMoreButton(false);
    }
  }, [cards.length, location.pathname, numberOfCards])

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
    <section className="card-list" aria-label="Фильмы">
      <ul className="card-list__wrapper">
        {cards.length > 0 && cards.slice(0, numberOfCards).map((card) => (
          <Card
            key={card.id}
            card={card}
          />
        ))}
      </ul>
      {isMoreButton && <button className="card-list__more-button" onClick={handleClickMoreButton}>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
