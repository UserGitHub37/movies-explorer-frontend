import { Link } from 'react-router-dom';

import './SiteNav.css';

function SiteNav () {
  return (
    <nav className='site-nav'>
      <ul className='site-nav__links'>
        <li className='site-nav__item-link'><Link to='/movies' className='site-nav__link site-nav__link_active'>Фильмы</Link></li>
        <li className='site-nav__item-link'><Link to='/saved-movies' className='site-nav__link'>Сохраненные фильмы</Link></li>
      </ul>
    </nav>
  );
}

export default SiteNav;
