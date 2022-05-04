import { useContext } from 'react';
import classNames from 'classnames';

import ThemeContext from '../../store/theme-context';

const Footer = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const footerClasses = classNames('footer', {
    ocean: theme === 'ocean',
    violet: theme === 'violet',
  });

  const oceanThemeHandler = () => {
    changeTheme('ocean');
  };
  const violetThemeHandler = () => {
    changeTheme('violet');
  };

  return (
    <footer className={footerClasses}>
      <ul className='themes'>
        <li onClick={oceanThemeHandler}>Ocean </li>
        <li onClick={violetThemeHandler}>Violet</li>
      </ul>
    </footer>
  );
};

export default Footer;
