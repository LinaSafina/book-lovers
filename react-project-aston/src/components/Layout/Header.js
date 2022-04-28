import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { userActions } from '../../store/user-slice';
import Wrapper from './Wrapper';

const activeLinkStyle = {
  textDecoration: 'underline',
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email: user } = useSelector((state) => {
    return state.user;
  });
  const favourites = useSelector((state) => state.favourites);
  const amountOfFavourites = Object.keys(favourites).length;
  const [isBtnAnimated, setIsBtnAnimated] = useState(false);

  useEffect(() => {
    setIsBtnAnimated(true);
    setTimeout(() => {
      setIsBtnAnimated(false);
    }, 500);
  }, [amountOfFavourites]);

  const favouritesBadgeClasses = classNames('favourites-badge', {
    animated: isBtnAnimated,
  });

  const logoutHandler = () => {
    dispatch(userActions.logout());
    navigate('/signin');
  };

  return (
    <header className='header'>
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
                        isActive ? activeLinkStyle : undefined
                      }
                    >
                      Sign in
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/signup'
                      style={({ isActive }) =>
                        isActive ? activeLinkStyle : undefined
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
