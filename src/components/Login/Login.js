import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ContainerWrapper from '../common/ContainerWrapper/ContainerWrapper';
import logoPath from '../../images/header-logo.svg';

import './Login.css';

function Login () {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function onSubmit (e) {
    e.preventDefault();
    navigate('/movies');
  }

  return (
    <ContainerWrapper
      className={"container-wrapper__color_black container-wrapper__type_grow"}
    >
      <div className="login">
        <Link to="/" className="login__logo-link">
          <img src={logoPath} alt="Логотип сайта" className="login__logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>

        <form
          className="login__form"
          action="#"
          name="login"
          onSubmit={onSubmit}
        >
          <fieldset className="login__fieldset">
            <label className="login__input-label">
              <p className="login__subtitle">E-mail</p>
              <input
                className="login__input login__input_field_email"
                id="login-email-input"
                type="email"
                name="loginEmail"
                placeholder="Введите E-mail"
                minLength='5'
                maxLength='40'
                required
                value={email ? email : ""}
                onChange={handleChangeEmail}
              />
              <span className="login__error-message login-email-input-error"></span>
            </label>
            <label className="login__input-label">
              <p className="login__subtitle">Пароль</p>
              <input
                className="login__input login__input_field_password login__input_type_error"
                id="login-password-input"
                type="password"
                name="loginPassword"
                placeholder="Введите пароль"
                minLength="5"
                maxLength="50"
                required
                value={password ? password : ""}
                onChange={handleChangePassword}
              />
              <span className="login__error-message login-password-input-error"></span>
            </label>
          </fieldset>
          <button type="submit" className="login__submit-btn">
            Войти
          </button>
        </form>
        <p className="login__footnote">Ещё не зарегистрированы?&ensp;<Link to="/signup" className="login__footnote-link">Регистрация</Link></p>
      </div>
    </ContainerWrapper>
  );
};

export default Login;
