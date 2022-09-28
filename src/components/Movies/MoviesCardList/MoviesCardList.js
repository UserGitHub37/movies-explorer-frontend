import { cards } from '../../../utils/movies'
import './MoviesCardList.css';
import Card from '../MoviesCard/MoviesCard';

function MoviesCardList () {
  return (
    <section className="card-list" aria-label="Фильмы">
      <ul className="card-list__wrapper">
        {cards.slice(0, 5).map((card) => (
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
