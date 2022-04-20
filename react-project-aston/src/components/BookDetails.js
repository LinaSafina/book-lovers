const BookDetails = (props) => {
  return (
    <div className='book-details card'>
      <img src={props.book.cover} alt='book cover' />
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
      </div>
    </div>
  );
};

export default BookDetails;
