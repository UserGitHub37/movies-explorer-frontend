import { useState, useCallback } from "react";

function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const form = target.closest("form");
    const name = target.name;
    const value = (target.name === 'email') ? target.value.toLowerCase() : target.value;
    const validityState = target.validity;

    if (validityState.patternMismatch && name === 'username') {
      target.setCustomValidity('Имя должно содержать только латиницу, кириллицу, пробел или дефис');
    } else if (validityState.patternMismatch && name === 'email') {
      target.setCustomValidity('Введите валидный адрес электронной почты');
    } else if (validityState.valueMissing) {
      target.setCustomValidity('Заполните это поле');
    } else {
      target.setCustomValidity('');
    }

    target.reportValidity();

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(form.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, resetForm };
}

export default useFormWithValidation;
