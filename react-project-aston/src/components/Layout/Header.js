import { NavLink, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Wrapper from './Wrapper';

const Header = () => {
  const authCtx = useContext(AuthContext);
  let activeLinkStyle = {
    textDecoration: 'underline',
  };

  const logoutHandler = () => {
    authCtx.logout();
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
              {!authCtx.isLoggedIn && (
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
              {authCtx.isLoggedIn && (
                <Fragment>
                  <li>
                    <NavLink
                      to='/favourites'
                      style={({ isActive }) =>
                        isActive ? activeLinkStyle : undefined
                      }
                    >
                      Favourites
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
