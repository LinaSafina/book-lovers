import { useEffect, useState, useCallback, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookList from '../components/BookList';
import Loading from '../components/Layout/Loading';
import Wrapper from '../components/Layout/Wrapper';

const Search = () => {
  // fetch
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchBooksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://gutendex.com/books?search=${searchParams.get(
          'title'
        )}&page=${1}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { count, results: loadedBooks } = await response.json();
      setBooks(loadedBooks);
      console.log(loadedBooks);
    } catch (e) {
      setError(e.message);
    }

    setIsLoading(false);
  }, [searchParams]);

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);
  // fetch

  let content = (
    <p>
      Sorry, we couldn't find any books. Change the search parameters and try
      again.
    </p>
  );

  if (books.length > 0) {
    content = <BookList books={books} />;
  }

  if (isLoading) {
    content = <Loading />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <Wrapper>
      <input />
      <input />
      <input />
      <input />
      <input />
      <Fragment>{content}</Fragment>
    </Wrapper>
  );
};

export default Search;
