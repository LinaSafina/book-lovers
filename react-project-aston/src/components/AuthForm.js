import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router';
import useValidation from '../hooks/use-validation';

const AuthForm = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

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

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const isEmailValid = submitEmailHandler(enteredEmail);
    const isPasswordValid = submitPasswordHandler(enteredPassword);

    let isFormValid = isEmailValid && isPasswordValid;

    if (isFormValid) {
      authCtx.login(enteredEmail);
      navigate(-1);
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
          <button type='submit'>{props.header}</button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
