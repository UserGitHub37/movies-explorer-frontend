import { Link } from 'react-router-dom';

import accBtnlogoPath from '../../../images/account-btn-logo.svg';
import burgerImgPath from '../../../images/burger.svg';

import './SiteNav.css';

function SiteNav () {

  return (
    <>
      <nav className="site-nav">
        <ul className="site-nav__links">
          <li className="site-nav__item-link">
            <Link to="/" className="site-nav__link">
              Главная
            </Link>
          </li>
          <li className="site-nav__item-link">
            <Link to="/movies" className="site-nav__link site-nav__link_active">
              Фильмы
            </Link>
          </li>
          <li className="site-nav__item-link">
            <Link to="/saved-movies" className="site-nav__link">
              Сохраненные фильмы
            </Link>
          </li>
        </ul>
      </nav>
      <button className="account-btn">
        <img
          src={accBtnlogoPath}
          alt="Логотип кнопки"
          className="account-btn__logo"
        />
        Аккаунт
      </button>
      <button className="burger-btn">
        <img
          src={burgerImgPath}
          alt="Логотип бургерного меню"
          className="burger-btn__logo"
        />
      </button>
    </>
  );
}

export default SiteNav;
