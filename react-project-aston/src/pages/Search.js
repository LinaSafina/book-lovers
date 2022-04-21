import { useEffect, useState, useCallback, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookList from '../components/BookList';
import Loading from '../components/Layout/Loading';
import Wrapper from '../components/Layout/Wrapper';
import SearchForm from '../components/SearchForm';

const Search = () => {
  // fetch
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const filteredParams = [...searchParams]
    .filter((param) => param[1] !== '')
    .reduce((prev, curr) => prev + `${curr[0]}=${curr[1]}&`, '');

  const fetchBooksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://gutendex.com/books?${filteredParams}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { count, results: loadedBooks } = await response.json();
      setBooks(loadedBooks);
    } catch (e) {
      setError(e.message);
    }

    setIsLoading(false);
  }, [filteredParams]);

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler, searchParams]);
  // fetch

  let content = (
    <p className='info'>
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
    content = <p className='info'>{error}</p>;
  }

  return (
    <Wrapper>
      <div className='search-page'>
        <SearchForm defaultValue={searchParams.get('search')} />
        <Fragment>{content}</Fragment>
      </div>
    </Wrapper>
  );
};

export default Search;
