import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const BookSummary = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  let title = props.book.title;
  let authors = props.book.authors;

  title = title.length > 50 ? title.slice(0, 49) + '...' : title;
  authors = authors.length > 40 ? authors.slice(0, 39) + '...' : authors;

  const clickIconHandler = (event) => {
    event.stopPropagation();
    navigate(authCtx.isLoggedIn ? '/favourites' : '/signup');
  };

  return (
    <li className='book-summary card' onClick={props.clickCardHandler}>
      <div className='book-image'>
        <img src={props.book.cover} alt='book cover' />
      </div>
      <div className='book-description'>
        <h3 className='book-title'>{title}</h3>
        <p>{authors}</p>
      </div>
      <div className='icon'>
        <input type='checkbox' id='like' />
        <label htmlFor='like' onClick={clickIconHandler}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path d='M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z' />
          </svg>
        </label>
      </div>
    </li>
  );
};

export default BookSummary;
