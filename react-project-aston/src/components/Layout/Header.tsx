import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Fragment, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { userActions } from '../../store/user-slice';
import Wrapper from './Wrapper';
import ThemeContext from '../../store/theme-context';
import { RootState } from '../../types/types';

const activeLinkStyle = {
  textDecoration: 'underline',
};
const linkStyle = { textDecoration: 'none' };

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email: user } = useSelector((state: RootState) => {
    return state.user;
  });
  const favourites = useSelector((state: RootState) => state.favourites);
  const amountOfFavourites = Object.keys(favourites).length;
  const [isBtnAnimated, setIsBtnAnimated] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setIsBtnAnimated(true);
    setTimeout(() => {
      setIsBtnAnimated(false);
    }, 500);
  }, [amountOfFavourites]);

  const favouritesBadgeClasses = classNames('favourites-badge', {
    animated: isBtnAnimated,
  });
  const headerClasses = classNames('header', {
    ocean: theme === 'ocean',
    violet: theme === 'violet',
  });

  const logoutHandler = () => {
    dispatch(userActions.logout());
    navigate('/signin');
  };

  return (
    <header className={headerClasses}>
      <Wrapper>
        <div className='flex-2-column'>
          <div className='logo'>
            <Link to='/'>
              <h1>Book lover</h1>
              <span>Find your best paper friend here</span>
            </Link>
          </div>
          <nav className='navigation'>
            <ul>
              {!user && (
                <Fragment>
                  <li>
                    <NavLink
                      to='/signin'
                      style={({ isActive }) =>
                        isActive ? activeLinkStyle : linkStyle
                      }
                    >
                      Sign in
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/signup'
                      style={({ isActive }) =>
                        isActive ? activeLinkStyle : linkStyle
                      }
                    >
                      Sign up
                    </NavLink>
                  </li>
                </Fragment>
              )}
              {user && (
                <Fragment>
                  <li>
                    <NavLink
                      to='/favourites'
                      style={({ isActive }) =>
                        isActive ? activeLinkStyle : undefined
                      }
                    >
                      Favourites
                      <span className={favouritesBadgeClasses}>
                        {amountOfFavourites}
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/history'
                      style={({ isActive }) =>
                        isActive ? activeLinkStyle : undefined
                      }
                    >
                      History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/signin'
                      style={({ isActive }) =>
                        isActive ? activeLinkStyle : undefined
                      }
                      onClick={logoutHandler}
                    >
                      Log out
                    </NavLink>
                  </li>
                </Fragment>
              )}
            </ul>
          </nav>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
