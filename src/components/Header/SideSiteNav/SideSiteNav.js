import { NavLink } from 'react-router-dom';
import './SideSiteNav.css';
import crossImgPath from '../../../images/cross.svg';
import accBtnlogoPath from '../../../images/account-btn-logo.svg';

function SideSiteNav ({ setMenuIsOpen, onAccBtnClick }) {

  function handleCloseBtnClick () {
    setMenuIsOpen(false);
  }

  return (
    <section className="side-nav">
      <button className="close-btn" onClick={handleCloseBtnClick}>
        <img
          src={crossImgPath}
          alt="Логотип кнопки закрытия"
          className="close-btn__logo"
        />
      </button>
      <nav className="side-nav__nav-wrapper">
        <ul className="side-nav__links">
          <li className="side-nav__item-link">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "side-nav__link side-nav__link_active"
                  : "side-nav__link"
              }
            >
              Главная
            </NavLink>
          </li>
          <li className="side-nav__item-link">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive
                  ? "side-nav__link side-nav__link_active"
                  : "side-nav__link"
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li className="side-nav__item-link">
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                isActive
                  ? "side-nav__link side-nav__link_active"
                  : "side-nav__link"
              }
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <button className="side-nav__acc-btn" onClick={onAccBtnClick}>
          <img
            src={accBtnlogoPath}
            alt="Логотип кнопки"
            className="side-nav__acc-btn-logo"
          />
          Аккаунт
        </button>
      </nav>
    </section>
  );
}

export default SideSiteNav;
