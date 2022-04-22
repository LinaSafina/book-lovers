import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';

const BookDetails = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  // const clickIconHandler = (event) => {
  //   navigate(authCtx.isLoggedIn ? '/favourites' : '/signup');
  // };

  return (
    <div className='book-details card'>
      <div className='book-cover'>
        <img src={props.book.cover} alt='book cover' />
      </div>
      <div className='book-description'>
        <h2 className='book-title'>{props.book.title}</h2>
        <p>
          <span className='italic bold'>Author:</span> {props.book.authors}
        </p>
        <p>
          <span className='italic bold'>Language:</span> {props.book.languages}
        </p>
        <p>
          <span className='italic bold'>Subjects:</span> {props.book.subjects}
        </p>
        <p>
          <span className='italic bold'>Download count:</span>{' '}
          {props.book['download_count']}
        </p>
        <input type='checkbox' id='like' />
        <label htmlFor='like'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path d='M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z' />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default BookDetails;
