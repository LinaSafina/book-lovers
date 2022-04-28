import editFetchData from '../helpers/editFetchData';
import HeartIcon from './HeartIcon';

const BookDetails = (props) => {
  const { book } = props;
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
          {changedData.downloadCount}
        </p>
        <HeartIcon id={book.id} />
      </div>
    </div>
  );
};

export default BookDetails;
