import { Link } from 'react-router-dom';
import Wrapper from './Wrapper';

const Header = () => {
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
              <li>
                <Link to='/signin'>Sign in</Link>
              </li>
              <li>
                <Link to='/signup'>Sign up</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
