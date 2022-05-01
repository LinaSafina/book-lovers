import React, { useState } from 'react';

const ThemeContext = React.createContext({
  theme: 'ocean',
  changeTheme: (theme) => {},
});

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'oceans'
  );
  const changeTheme = (chosenTheme) => {
    if (theme === chosenTheme) {
      return;
    }
    localStorage.setItem('theme', chosenTheme);
    setTheme(chosenTheme);
  };

  const contextValue = {
    theme,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
