import { Link } from 'react-router-dom';
import logoPath from '../../images/header-logo.svg';

import './Header.css';

function Header ({ isSiteNavActive = false }) {

  return (
    <header className='header'>

      <div className='container-wrapper container-wrapper__color_dark-blue'>
        <div className='main-header'>
          <div className='main-header__logo-wrapper'>
            <Link to='/' className='main-header__logo-link'>
              <img src={logoPath} alt='Логотип сайта' className='main-header__logo'/>
            </Link>
          </div>

          {isSiteNavActive && (
            <nav className='site-nav'>
              <ul className='site-nav__links'>
                <li className='site-nav__item-link'><Link to='/movies' className='site-nav__link site-nav__link_active'>Фильмы</Link></li>
                <li className='site-nav__item-link'><Link to='/saved-movies' className='site-nav__link'>Сохраненные фильмы</Link></li>
              </ul>
            </nav>
          )}

          <nav className='auth-nav'>
            <Link to='/signup' className='auth-nav__link'>Регистрация</Link>
            <button className='auth-nav__button'>Войти</button>
          </nav>
        </div>
        <div className='header-banner'>
          <div className="header-banner__title-wrapper">
            <h1 className="header-banner__title">Учебный проект студента факультета Веб-разработки.</h1>
          </div>
        </div>
      </div>

      <div className='container-wrapper container-wrapper__color_grey'>
        <nav className='main-page-nav'>
          <ul className="main-page-nav__links">
            <li className="main-page-nav__item-link"><Link to='#' className='main-page-nav__link'>О проекте</Link></li>
            <li className="main-page-nav__item-link"><Link to='#' className='main-page-nav__link'>Технологии</Link></li>
            <li className="main-page-nav__item-link"><Link to='#' className='main-page-nav__link'>Студент</Link></li>
          </ul>
        </nav>
      </div>

    </header>
  );
}

export default Header;
