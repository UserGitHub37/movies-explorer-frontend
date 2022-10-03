import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ContainerWrapper from '../common/ContainerWrapper/ContainerWrapper';
import logoPath from '../../images/header-logo.svg';

import './Register.css';

function Register () {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, []);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function onSubmit (e) {
    e.preventDefault();
    navigate('/signin');
  }

  return (
    <ContainerWrapper
      className={"container-wrapper__color_black container-wrapper__type_grow"}
    >
      <div className="register">
        <Link to="/" className="register__logo-link">
          <img src={logoPath} alt="Логотип сайта" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>

        <form
          className="register__form"
          action="#"
          name="register"
          onSubmit={onSubmit}
        >
          <fieldset className="register__fieldset">
            <label className="register__input-label">
              <p className="register__subtitle">Имя</p>
              <input
                className="register__input register__input_field_name"
                id="register-name-input"
                type="text"
                name="registerName"
                placeholder="Введите имя"
                minLength="2"
                maxLength="30"
                required
                value={name ? name : ""}
                onChange={handleChangeName}
              />
              <span className="register__error-message register-name-input-error"></span>
            </label>
            <label className="register__input-label">
              <p className="register__subtitle">E-mail</p>
              <input
                className="register__input register__input_field_email"
                id="register-email-input"
                type="email"
                name="registerEmail"
                placeholder="Введите E-mail"
                minLength='5'
                maxLength='40'
                required
                value={email ? email : ""}
                onChange={handleChangeEmail}
              />
              <span className="register__error-message register-email-input-error"></span>
            </label>
            <label className="register__input-label">
              <p className="register__subtitle">Пароль</p>
              <input
                className="register__input register__input_field_password register__input_type_error"
                id="register-password-input"
                type="password"
                name="registerPassword"
                placeholder="Введите пароль"
                minLength="5"
                maxLength="50"
                required
                value={password ? password : ""}
                onChange={handleChangePassword}
              />
              <span className="register__error-message register-password-input-error">Что-то пошло не так...</span>
            </label>
          </fieldset>
          <button type="submit" className="register__submit-btn">
            Зарегистрироваться
          </button>
        </form>
        <p className="register__footnote">Уже зарегистрированы?&ensp;<Link to="/signin" className="register__footnote-link">Войти</Link></p>
      </div>
    </ContainerWrapper>
  );
};

export default Register;
