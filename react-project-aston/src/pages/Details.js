import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import Loading from '../components/Layout/Loading';

const Details = () => {
  // fetch
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  const fetchBooksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://gutendex.com/books/${params.bookId}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const loadedBook = await response.json();
      setBook(loadedBook);
    } catch (e) {
      setError(e.message);
    }

    setIsLoading(false);
  }, [params.bookId]);

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);
  // fetch

  let content = (
    <p className='info'>We couldn't find this book's description</p>
  );

  if (book) {
    content = <BookDetails book={book} />;
  }

  if (isLoading) {
    content = <Loading />;
  }

  if (error) {
    content = <p className='info'>{error}</p>;
  }

  return <div className='details'>{content}</div>;
};

export default Details;
