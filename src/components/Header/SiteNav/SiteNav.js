import { Link } from 'react-router-dom';

import useViewport from '../../../hooks/useViewport';

import './SiteNav.css';

function SiteNav () {
  const { width } = useViewport();
  const breakpoint = 768;

  console.log(width);

  return (
    <nav className='site-nav'>
      <ul className='site-nav__links'>
        {width > breakpoint && (
          <>
            <li className='site-nav__item-link'><Link to='/movies' className='site-nav__link site-nav__link_active'>Фильмы</Link></li>
            <li className='site-nav__item-link'><Link to='/saved-movies' className='site-nav__link'>Сохраненные фильмы</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default SiteNav;
