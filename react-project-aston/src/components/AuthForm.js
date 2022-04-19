import { useState, useRef, useContext } from 'react';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router';

const AuthForm = (props) => {
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const navigate = useNavigate();

  //Validation
  const validateInputEmail = (input) => {
    return input.trim().length >= 3 && input.includes('@');
  };
  const validateInputPassword = (input) => {
    return input.trim().length >= 5;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let isEmailValid = false;
    let isPasswordValid = false;
    let isFormValid = false;
    let isFormTouched = true;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    isEmailValid = validateInputEmail(enteredEmail);
    isPasswordValid = validateInputPassword(enteredPassword);

    let emailInvalid = !isEmailValid && isFormTouched;

    setIsEmailInvalid(emailInvalid);
    setIsPasswordInvalid(!isPasswordValid && isFormTouched);
    isFormValid = isEmailValid && isPasswordValid;

    if (isFormValid) {
      authCtx.login(enteredEmail);
      navigate('/');
    }
  };

  return (
    <section className='auth'>
      <h1>{props.header}</h1>
      <form onSubmit={submitHandler} noValidate>
        <div className='auth__control'>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
          {isEmailInvalid && <span>Email is invalid</span>}
        </div>
        <div className='auth__control'>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
          {isPasswordInvalid && <span>Password is invalid</span>}
        </div>
        <div className='auth__action'>
          <button>{props.header}</button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
