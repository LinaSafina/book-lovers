const BookCard = () => {
  return (
    <div className='book-summary card'>
      <img
        src='https://motaen.com/upload/wallpapers/source/2014/04/24/11/05/40045/o3PbXiAHZT.jpg'
        alt='book cover'
      />
      <div className='book-description'>
        <h2>Name</h2>
        <h3>Author</h3>
        <p>Description</p>
      </div>
    </div>
  );
};

export default BookCard;
