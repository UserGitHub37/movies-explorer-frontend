import { useEffect, useState, useContext, useRef } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

import ContainerWrapper from '../common/ContainerWrapper/ContainerWrapper';
import { nameRegExp, emailRegExp } from '../../utils/constants';
import './Profile.css';

function Profile ({ onSignOut, onUpdateUser, serverMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const formRef = useRef();

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormWithValidation();

  const [ editMode, setEditMode ] = useState(false);

useEffect(() => {
  setEditMode(false);
}, [currentUser])

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
      username: currentUser.name,
      email: currentUser.email,
  })
}, []);

  function onSubmit(e) {
    e.preventDefault();
    if (
      isValid &&
      (currentUser.name !== values.username ||
        currentUser.email !== values.email)
    ) {
      onUpdateUser({
        name: values.username,
        email: values.email,
      });
    }
  }

  function handleEditModeEntry () {
    setEditMode(true);
  }


  return (
    <ContainerWrapper
      className={"container-wrapper__color_black container-wrapper__type_grow"}
    >
      <div className="profile">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>

        <form
          id="profile"
          className="profile__form"
          action="#"
          name="profile"
          onSubmit={onSubmit}
          ref={formRef}
        >
          <fieldset className="profile__fieldset">
            <label className="profile__input-label">
              <p className="profile__subtitle">Имя</p>
              <input
                className={`profile__input profile__input_field_name${
                  errors.username ? " profile__input_type_error" : ""
                }`}
                id="profile-name-input"
                type="text"
                name="username"
                placeholder="Введите имя"
                minLength="2"
                maxLength="30"
                value={values.username ? values.username : ""}
                onChange={handleChange}
                required
                pattern={nameRegExp}
                disabled={!editMode}
              />
              <span className="profile__error-message profile-name-input-error">
                {errors.username ? errors.username : ""}
              </span>
            </label>
            <label className="profile__input-label">
              <p className="profile__subtitle">E-mail</p>
              <input
                className={`profile__input${
                  errors.email ? " profile__input_type_error" : ""
                }`}
                id="profile-email-input"
                type="email"
                name="email"
                placeholder="Введите E-mail"
                minLength="5"
                maxLength="40"
                value={values.email ? values.email : ""}
                onChange={handleChange}
                required
                pattern={emailRegExp}
                disabled={!editMode}
              />
              <span className="profile__error-message profile-email-input-error">
                {errors.email ? errors.email : ""}
              </span>
            </label>
          </fieldset>
        </form>
        <div className="profile__btn-wrap">
          <span
            className={`profile__server-message${
              serverMessage.isError ? " profile__server-message_type_error" : ""
            }`}
          >
            {serverMessage.text}
          </span>
          {editMode && (
            <button
              type="submit"
              className={`profile__submit-btn${
                isValid &&
                (currentUser.name !== values.username ||
                  currentUser.email !== values.email)
                  ? ""
                  : " profile__submit-btn_disabled"
              }`}
              form="profile"
            >
              Сохранить
            </button>
          )}
          {!editMode && (
            <button
              type="button"
              className="profile__edit-btn"
              onClick={handleEditModeEntry}
            >
              Редактировать
            </button>
          )}
          {!editMode && (
            <button
              type="button"
              className="profile__logout-btn"
              onClick={onSignOut}
            >
              Выйти из аккаунта
            </button>
          )}
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Profile;
