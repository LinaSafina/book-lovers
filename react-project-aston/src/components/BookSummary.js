const BookSummary = (props) => {
  return (
    <li className='book-summary card' onClick={props.clickCardHandler}>
      <div className='book-image'>
        <img src={props.book.cover} alt='book cover' />
      </div>
      <div className='book-description'>
        <h3 className='book-title'>{props.book.title}</h3>
        <p>{props.book.authors}</p>
      </div>
    </li>
  );
};

export default BookSummary;
