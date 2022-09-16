import { Link } from 'react-router-dom';

import './MainPageNav.css';

function MainPageNav () {
  return (
    <nav className='main-page-nav'>
      <ul className="main-page-nav__links">
        <li className="main-page-nav__item-link"><Link to='#' className='main-page-nav__link'>О проекте</Link></li>
        <li className="main-page-nav__item-link"><Link to='#' className='main-page-nav__link'>Технологии</Link></li>
        <li className="main-page-nav__item-link"><Link to='#' className='main-page-nav__link'>Студент</Link></li>
      </ul>
    </nav>
  );
}

export default MainPageNav;
