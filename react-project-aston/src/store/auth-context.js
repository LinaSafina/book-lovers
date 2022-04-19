import React, { useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: (user) => {},
  logout: () => {},
  user: null,
});

export const AuthProvider = (props) => {
  let initialUser;
  const savedUser = localStorage.getItem('user');

  if (savedUser) {
    initialUser = savedUser;
  }

  const [user, setUser] = useState(initialUser);
  let isLoggedIn = !!user;

  const login = (user) => {
    localStorage.setItem('user', user);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const contextValue = {
    user,
    isLoggedIn,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
