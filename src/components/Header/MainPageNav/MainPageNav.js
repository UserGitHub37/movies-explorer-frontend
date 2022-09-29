import { Link } from 'react-router-dom';

import './MainPageNav.css';

function MainPageNav () {
  return (
    <nav className='main-page-nav'>
      <ul className="main-page-nav__links">
        <li className="main-page-nav__item-link"><a href='#project' className='main-page-nav__link'>О проекте</a></li>
        <li className="main-page-nav__item-link"><a href='#techs' className='main-page-nav__link'>Технологии</a></li>
        <li className="main-page-nav__item-link"><a href='#student' className='main-page-nav__link'>Студент</a></li>
      </ul>
    </nav>
  );
}

export default MainPageNav;
