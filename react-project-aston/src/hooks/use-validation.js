import { useState, useRef } from 'react';

const useValidation = (inputType) => {
  const inputRef = useRef();
  const [isInvalid, setIsInvalid] = useState(false);

  const validateInput = (input) => {
    switch (inputType) {
      case 'email':
        return input.trim().length >= 3 && input.includes('@');

      case 'password':
        return input.trim().length >= 5;

      default:
        console.log('Input type is not defined');
    }
  };

  const submitValueHandler = (currentValue) => {
    let isValueValid = validateInput(currentValue);

    setIsInvalid(!isValueValid);

    return isValueValid;
  };

  return {
    inputRef,
    isInvalid,
    submitValueHandler,
  };
};

export default useValidation;
