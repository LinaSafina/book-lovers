import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import editFetchData from '../helpers/edit-fetch-data';

const Details = () => {
  // fetch
  const [book, setBook] = useState([]);
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
      const changedData = editFetchData(loadedBook);

      setBook(changedData);
    } catch (e) {
      setError(e.message);
    }

    setIsLoading(false);
  }, [params.bookId]);

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);
  // fetch

  return (
    <div className='details'>
      <BookDetails book={book} />
    </div>
  );
};

export default Details;
