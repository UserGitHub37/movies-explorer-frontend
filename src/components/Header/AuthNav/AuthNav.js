import { Link } from 'react-router-dom';

import './AuthNav.css';

function AuthNav () {
  return (
    <nav className='auth-nav'>
      <Link to='/signup' className='auth-nav__link'>Регистрация</Link>
      <button className='auth-nav__button'>Войти</button>
    </nav>
  );

}

export default AuthNav;
