import { useState, useEffect } from 'react';
import useViewport from '../../../hooks/useViewport';
import Card from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList ({ isMoreButton = false }) {
  const { width } = useViewport();

  const [cards, setCards] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(5);

  const breakpoint = {
        sm: 630,
        md: 930,
        lg: 1280,
      };
  useEffect(() => {
    if (sessionStorage.getItem('cards')) {
      setCards(JSON.parse(sessionStorage.getItem('cards')));
    }

  }, [])

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
        {cards.slice(0, numberOfCards).map((card) => (
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
