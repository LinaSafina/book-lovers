import { useNavigate } from 'react-router-dom';

import BookSummary from './BookSummary';
import { BookData } from '../types/types';

const FavouritesList: React.FC<{ books: BookData[] }> = (props) => {
  const navigate = useNavigate();

  const clickCardHandler = (bookId: number) => {
    navigate(`/details/${bookId}`);
  };

  const bookList = props.books.map((book) => {
    return (
      <BookSummary
        key={book.id}
        book={book}
        onClick={() => clickCardHandler(book.id)}
      />
    );
  });

  return <ul className='book-list'>{bookList}</ul>;
};

export default FavouritesList;
