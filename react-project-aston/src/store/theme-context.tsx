import React, { useState } from 'react';

import { Props } from '../types/types';

const ThemeContext = React.createContext({
  theme: 'ocean',
  changeTheme: (theme: string) => {},
});

export const ThemeProvider: React.FC<Props> = (props) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'oceans'
  );
  const changeTheme = (chosenTheme: string) => {
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
