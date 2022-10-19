import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';

import ContainerWrapper from '../common/ContainerWrapper/ContainerWrapper';
import logoPath from '../../images/header-logo.svg';

import './Register.css';

import { nameRegExp, emailRegExp } from '../../utils/constants';

function Register ({ onRegister, serverMessage }) {

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

  function handleSubmit (e) {
    e.preventDefault();
    if (isValid) {
      onRegister({
        name: values.username,
        email: values.email,
        password: values.password,
      });
    }
  }

  return (
    <ContainerWrapper className={"container-wrapper__color_black container-wrapper__type_grow"}>
      <div className="register">
        <Link to="/" className="register__logo-link">
          <img src={logoPath} alt="Логотип сайта" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>

        <form
          className="register__form"
          action="#"
          name="register"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <fieldset className="register__fieldset">
            <label className="register__input-label">
              <p className="register__subtitle">Имя</p>
              <input
                className="register__input register__input_field_name"
                id="register-name-input"
                type="text"
                name="username"
                placeholder="Введите имя"
                value={values.username ? values.username : ""}
                onChange={handleChange}
                required
                pattern={nameRegExp}
              />
              <span className="register__error-message register-name-input-error">{errors.username ? errors.username : ""}</span>
            </label>
            <label className="register__input-label">
              <p className="register__subtitle">E-mail</p>
              <input
                className="register__input register__input_field_email"
                id="register-email-input"
                type="email"
                name="email"
                placeholder="Введите E-mail"
                value={values.email ? values.email : ""}
                onChange={handleChange}
                required
                pattern={emailRegExp}
              />
              <span className="register__error-message register-email-input-error">{errors.email ? errors.email : ""}</span>
            </label>
            <label className="register__input-label">
              <p className="register__subtitle">Пароль</p>
              <input
                className="register__input register__input_field_password register__input_type_error"
                id="register-password-input"
                type="password"
                name="password"
                placeholder="Введите пароль"
                value={values.password ? values.password : ""}
                onChange={handleChange}
                required
              />
              <span className="register__error-message register-password-input-error">{errors.password ? errors.password : ""}</span>
            </label>
          </fieldset>
          <div className="register__btn-wrap">
            <span className={`register__server-message${serverMessage.isError ? " register__server-message_type_error" : ""}`}>{serverMessage.text}</span>
            <button type="submit" className="register__submit-btn" >
              Зарегистрироваться
            </button>
          </div>
        </form>
        <p className="register__footnote">Уже зарегистрированы?&ensp;<Link to="/signin" className="register__footnote-link">Войти</Link></p>
      </div>
    </ContainerWrapper>
  );
};

export default Register;
