import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import useValidation from '../hooks/use-validation';
import { userActions } from '../store/user-slice';
import React from 'react';

const AuthForm: React.FC<{ header: any; type: any }> = (props) => {
  const dispatch = useDispatch();

  const {
    inputRef: emailInputRef,
    isInvalid: isEmailInvalid,
    submitValueHandler: submitEmailHandler,
  } = useValidation('email');

  const {
    inputRef: passwordInputRef,
    isInvalid: isPasswordInvalid,
    submitValueHandler: submitPasswordHandler,
  } = useValidation('password');

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    const isEmailValid = submitEmailHandler(enteredEmail);
    const isPasswordValid = submitPasswordHandler(enteredPassword);

    let isFormValid = isEmailValid && isPasswordValid;

    if (isFormValid) {
      props.type === 'signin'
        ? dispatch(userActions.login(enteredEmail))
        : dispatch(userActions.signup(enteredEmail));
    }
  };

  return (
    <section className='auth'>
      <h1>{props.header}</h1>
      <form onSubmit={submitHandler} noValidate>
        <div className='form__control'>
          <label htmlFor='email'>Your Email</label>
          <input
            className='transparent'
            type='email'
            id='email'
            required
            ref={emailInputRef}
          />
          {isEmailInvalid && <span>Email is invalid</span>}
        </div>
        <div className='form__control'>
          <label htmlFor='password'>Your Password</label>
          <input
            className='transparent'
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
          {isPasswordInvalid && <span>Password is invalid</span>}
        </div>
        <div className='form__action'>
          <button className='button' type='submit'>
            {props.header}
          </button>
        </div>
      </form>
    </section>
  );
};

AuthForm.propTypes = {
  type: PropTypes.oneOf(['signin', 'signup']),
  header: PropTypes.string,
};

export default AuthForm;
