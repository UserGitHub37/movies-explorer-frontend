import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ContainerWrapper from '../common/ContainerWrapper/ContainerWrapper';
import logoPath from '../../images/header-logo.svg';
import SiteNav from './SiteNav/SiteNav';
import AuthNav from './AuthNav/AuthNav';
import SideSiteNav from './SideSiteNav/SideSiteNav';

import './Header.css';

function Header ({ loggedIn, color }) {
  const [ menuIsOpen, setMenuIsOpen ] = useState(false);
  const navigate = useNavigate();

  function handleAccBtnClick () {
    navigate('/profile');
  }

  return (
    <ContainerWrapper className={`container-wrapper__color_${color}`}>
      <header className='header'>
        {menuIsOpen && <SideSiteNav setMenuIsOpen={setMenuIsOpen} onAccBtnClick={handleAccBtnClick} />}
        <div className="header__logo-wrapper">
          <Link to="/" className="header__logo-link">
            <img
              src={logoPath}
              alt="Логотип сайта"
              className="header__logo"
            />
          </Link>
        </div>
        {loggedIn ? (
          <SiteNav setMenuIsOpen={setMenuIsOpen} onAccBtnClick={handleAccBtnClick} />
        ) : (
          <AuthNav />
        )}
      </header>
    </ContainerWrapper>
  );
}

export default Header;
