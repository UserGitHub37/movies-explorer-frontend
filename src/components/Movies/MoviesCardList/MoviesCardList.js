import { useState, useEffect } from 'react';
import { cards } from '../../../utils/movies'
import useViewport from '../../../hooks/useViewport';
import './MoviesCardList.css';
import Card from '../MoviesCard/MoviesCard';

function MoviesCardList () {
  const { width } = useViewport();

  const [numberOfCards, setNumberOfCards] = useState(5);

  useEffect(() => {
    const breakpoint = {
      sm: 630,
      md: 930,
      lg: 1280,
    };

    if (width < breakpoint.sm) {
      setNumberOfCards(5);
    } else if (width < breakpoint.md) {
      setNumberOfCards(8);
    } else if (width < breakpoint.lg) {
      setNumberOfCards(12);
    } else {
      setNumberOfCards(16);
    }
  }, [width])

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
      <button className="card-list__more-button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
