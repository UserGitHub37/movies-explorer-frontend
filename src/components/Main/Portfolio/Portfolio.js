import ContainerWrapper from '../../common/ContainerWrapper/ContainerWrapper';

import arrowPath from '../../../images/arrow.svg';

import './Portfolio.css';

function Portfolio () {
  return (
    <section className="portfolio">
      <ContainerWrapper className={"container-wrapper__color_black"}>
        <div className="portfolio__container">
          <h2 className="portfolio__heading">Портфолио</h2>
          <ul className="portfolio__list">
            <li className="portfolio__list-item">
              <a
                href="https://github.com/UserGitHub37/how-to-learn/"
                className="portfolio__link"
              >
                Статичный сайт
              </a>
              <a
                href="https://github.com/UserGitHub37/how-to-learn/"
                className="portfolio__link"
              >
                <img src={arrowPath} alt="" className="portfolio__arrow" />
              </a>
            </li>
            <li className="portfolio__list-item">
              <a
                href="https://github.com/UserGitHub37/russian-travel/"
                className="portfolio__link"
              >
                Адаптивный сайт
              </a>
              <a
                href="https://github.com/UserGitHub37/russian-travel/"
                className="portfolio__link"
              >
                <img src={arrowPath} alt="" className="portfolio__arrow" />
              </a>
            </li>
            <li className="portfolio__list-item">
              <a
                href="https://github.com/UserGitHub37/react-mesto-api-full/"
                className="portfolio__link"
              >
                Одностраничное приложение
              </a>
              <a
                href="https://github.com/UserGitHub37/react-mesto-api-full/"
                className="portfolio__link"
              >
                <img src={arrowPath} alt="" className="portfolio__arrow" />
              </a>
            </li>
          </ul>
        </div>
      </ContainerWrapper>
    </section>
  );
}

export default Portfolio;
