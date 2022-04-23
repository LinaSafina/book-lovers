import { useNavigate } from 'react-router-dom';
import BookSummary from './BookSummary';

const BookList = (props) => {
  const navigate = useNavigate();

  const clickCardHandler = (bookId) => {
    navigate(`/details/${bookId}`);
  };

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
