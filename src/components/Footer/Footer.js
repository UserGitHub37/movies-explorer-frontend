import ContainerWrapper from '../common/ContainerWrapper/ContainerWrapper';

import './Footer.css';

function Footer () {
  return (
    <section className="footer">
      <ContainerWrapper className={"container-wrapper__color_black"}>
        <div className="footer__container">
          <h2 className="footer__heading">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h2>
          <div className="footer__link-wrapper">
            <ul className="footer__link-list">
              <li className="footer__list-item">
                <a href="https://practicum.yandex.ru/" className="footer__link">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__list-item">
                <a href="https://github.com/" className="footer__link">
                  Github
                </a>
              </li>
            </ul>
            <p className="footer__copyright">© 2020</p>
          </div>
        </div>
      </ContainerWrapper>
    </section>
  );
}

export default Footer;
