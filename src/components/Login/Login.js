import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';

import ContainerWrapper from '../common/ContainerWrapper/ContainerWrapper';
import logoPath from '../../images/header-logo.svg';

import './Login.css';

import { emailRegExp } from '../../utils/constants';

function Login ({ onLogin, serverMessage }) {

  const formRef = useRef();

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormWithValidation();

  useEffect(() => {
    const form = formRef.current;
    function disableInputHints (e) {
      e.preventDefault();
    }
    form.addEventListener('invalid', disableInputHints, true);
    return () => form.removeEventListener('invalid', disableInputHints);
  }, []);

  useEffect(() => {
    resetForm({
      username: '',
      email: '',
      password: ''
  })
}, []);

  function onSubmit (e) {
    e.preventDefault();
    if (isValid) {
      onLogin({
        email: values.email,
        password: values.password,
      });
    }
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
          ref={formRef}
        >
          <fieldset className="login__fieldset">
            <label className="login__input-label">
              <p className="login__subtitle">E-mail</p>
              <input
                className={`login__input${
                  errors.email ? " login__input_type_error" : ""
                }`}
                id="login-email-input"
                type="email"
                name="email"
                placeholder="Введите E-mail"
                value={values.email ? values.email : ""}
                onChange={handleChange}
                required
                pattern={emailRegExp}
              />
              <span className="login__error-message login-email-input-error">
                {errors.email ? errors.email : ""}
              </span>
            </label>
            <label className="login__input-label">
              <p className="login__subtitle">Пароль</p>
              <input
                className={`login__input${
                  errors.password ? " login__input_type_error" : ""
                }`}
                id="login-password-input"
                type="password"
                name="password"
                placeholder="Введите пароль"
                minLength="5"
                maxLength="50"
                value={values.password ? values.password : ""}
                onChange={handleChange}
                required
              />
              <span className="login__error-message login-password-input-error">
                {errors.password ? errors.password : ""}
              </span>
            </label>
          </fieldset>
          <div className="login__btn-wrap">
            <span
              className={`login__server-message${
                serverMessage.isError ? " login__server-message_type_error" : ""
              }`}
            >
              {serverMessage.text}
            </span>
            <button
              type="submit"
              className={`login__submit-btn${
                isValid ? "" : " login__submit-btn_disabled"
              }`}
            >
              Войти
            </button>
          </div>
        </form>
        <p className="login__footnote">
          Ещё не зарегистрированы?&ensp;
          <Link to="/signup" className="login__footnote-link">
            Регистрация
          </Link>
        </p>
      </div>
    </ContainerWrapper>
  );
};

export default Login;
