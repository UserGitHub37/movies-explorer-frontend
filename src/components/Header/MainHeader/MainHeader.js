import { Link } from 'react-router-dom';
import logoPath from '../../../images/header-logo.svg';

import './MainHeader.css';

function MainHeader ({ children }) {
  return (
    <div className='main-header'>
      <div className='main-header__logo-wrapper'>
        <Link to='/' className='main-header__logo-link'>
          <img src={logoPath} alt='Логотип сайта' className='main-header__logo'/>
        </Link>
      </div>

      {children}

    </div>
  );
}

export default MainHeader;
