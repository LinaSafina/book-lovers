import editFetchData from '../helpers/edit-fetch-data';
import HeartIcon from './HeartIcon';

const BookDetails = (props) => {
  const book = props.book;
  const changedData = editFetchData(book);

  return (
    <div className='book-details card'>
      <div className='book-cover'>
        <img src={changedData.cover} alt='book cover' />
      </div>
      <div className='book-description'>
        <h2 className='book-title'>{changedData.title}</h2>
        <p>
          <span className='italic bold'>Author:</span> {changedData.authors}
        </p>
        <p>
          <span className='italic bold'>Language:</span> {changedData.languages}
        </p>
        <p>
          <span className='italic bold'>Subjects:</span> {changedData.subjects}
        </p>
        <p>
          <span className='italic bold'>Download count:</span>{' '}
          {changedData['download_count']}
        </p>
        <HeartIcon book={book} />
      </div>
    </div>
  );
};

export default BookDetails;
