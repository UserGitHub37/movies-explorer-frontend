import { Link, useNavigate } from 'react-router-dom';

import './AuthNav.css';

function AuthNav () {

  const navigate = useNavigate();

  function handleAccBtnClick () {
    navigate('/signin');
  }

  return (
    <nav className="auth-nav">
      <Link to="/signup" className="auth-nav__link">Регистрация</Link>
      <button className="auth-nav__btn" onClick={handleAccBtnClick}>Войти</button>
    </nav>
  );

}

export default AuthNav;
