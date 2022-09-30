import { NavLink } from 'react-router-dom';

import burgerImgPath from '../../../images/burger.svg';
import accBtnlogoPath from '../../../images/account-btn-logo.svg';

import './SiteNav.css';

function SiteNav ({ setMenuIsOpen, onAccBtnClick }) {

    function handleBurgerBtnClick () {
    setMenuIsOpen(true);
  }

  return (
    <>
      <nav className="site-nav">
        <ul className="site-nav__links">
          <li className="site-nav__item-link">
            <NavLink to="/movies" className={({ isActive }) => isActive ? "site-nav__link site-nav__link_active" : "site-nav__link"}>
              Фильмы
            </NavLink>
          </li>
          <li className="site-nav__item-link">
            <NavLink to="/saved-movies" className={({ isActive }) => isActive ? "site-nav__link site-nav__link_active" : "site-nav__link"}>
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
      </nav>
      <button className="site-nav__acc-btn" onClick={onAccBtnClick}>
        <img
          src={accBtnlogoPath}
          alt="Логотип кнопки"
          className="site-nav__acc-btn-logo"
        />
        Аккаунт
      </button>
      <button className="burger-btn" onClick={handleBurgerBtnClick}>
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
