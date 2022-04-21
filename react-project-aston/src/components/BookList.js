import { useNavigate } from 'react-router-dom';
import BookSummary from './BookSummary';
import editFetchData from '../helpers/edit-fetch-data';

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

  return <ul className='book-list'>{bookList}</ul>;
};

export default BookList;
