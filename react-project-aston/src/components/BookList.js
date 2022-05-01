import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import BookSummary from './BookSummary';
import { historyActions } from '../store/history-slice';

let isFirstLoading = true;

const BookList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickCardHandler = (bookId) => {
    navigate(`/details/${bookId}`);
  };

  if (isFirstLoading) {
    isFirstLoading = false;
  } else {
    dispatch(historyActions.add(Object.fromEntries(props.searchParams)));
    isFirstLoading = true;
  }

  const bookList = props.books.map((book) => {
    return (
      <BookSummary
        key={book.id}
        book={book}
        onClick={clickCardHandler.bind(null, book.id)}
      />
    );
  });

  return <ul className='book-list'>{bookList}</ul>;
};

export default BookList;
