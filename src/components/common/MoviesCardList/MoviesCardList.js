import { useState, useEffect } from 'react';
import useViewport from '../../../hooks/useViewport';
import Card from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList ({ isMoreButton = false }) {
  const { width } = useViewport();

  const [cards, setCards] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(5);

  useEffect(() => {
    if (sessionStorage.getItem('cards')) {
      setCards(JSON.parse(sessionStorage.getItem('cards')));
    }

  }, [])

  useEffect(() => {
    const breakpoint = {
      sm: 630,
      md: 930,
      lg: 1280,
    };

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

  }, [cards.length, width])

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
      {isMoreButton && <button className="card-list__more-button">Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
