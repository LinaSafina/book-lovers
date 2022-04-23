import HeartIcon from './HeartIcon';
import editFetchData from '../helpers/edit-fetch-data';

const BookSummary = (props) => {
  const book = props.book;
  const changedData = editFetchData(book);
  let title = changedData.title;
  let authors = changedData.authors;

  title = title.length > 50 ? title.slice(0, 49) + '...' : title;
  authors = authors.length > 40 ? authors.slice(0, 39) + '...' : authors;

  return (
    <li className='book-summary card' onClick={props.onClick}>
      <div className='book-image'>
        <img src={changedData.cover} alt='book cover' />
      </div>
      <div className='book-description'>
        <h3 className='book-title'>{title}</h3>
        <p>{authors}</p>
      </div>
      <HeartIcon book={book} />
    </li>
  );
};

export default BookSummary;
