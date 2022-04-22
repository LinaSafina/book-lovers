import { useNavigate } from 'react-router-dom';
import BookSummary from './BookSummary';
import editFetchData from '../helpers/edit-fetch-data';
import { Fragment } from 'react';

const BookList = (props) => {
  const navigate = useNavigate();

  const clickCardHandler = (bookId) => {
    navigate(`/details/${bookId}`);
  };

  const bookList = props.books.map((book) => {
    const changedData = editFetchData(book);

    return (
      <BookSummary
        key={book.id}
        book={changedData}
        clickCardHandler={clickCardHandler.bind(null, book.id)}
      />
    );
  });

  return (
    <Fragment>
      <p className='search-results'>
        We have found <span className='bold'>{props.count}</span> books
      </p>
      <ul className='book-list'>{bookList}</ul>
    </Fragment>
  );
};

export default BookList;
