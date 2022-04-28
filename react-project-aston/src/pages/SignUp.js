import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthForm from '../components/AuthForm';

const SignUp = () => {
  const { email: user } = useSelector((state) => state.user);

  if (user) {
    return <Navigate to='/' replace />;
  }

  return <AuthForm header='Sign Up' type='signup' />;
};

export default SignUp;
