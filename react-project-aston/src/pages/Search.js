import { useEffect, useState, useRef, useCallback, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { historyActions } from '../store/history-slice';
import BookList from '../components/BookList';
import Loading from '../components/Layout/Loading';
import Wrapper from '../components/Layout/Wrapper';
import SearchForm from '../components/SearchForm';

const Search = () => {
  // fetch
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const firstUpdate = useRef(true);

  const fetchBooksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const queryParam = (param) => {
      return (
        (searchParams.get(param) &&
          searchParams.get(param) !== 'all' &&
          `${param}=${searchParams.get(param)}&`) ||
        ''
      );
    };

    const query =
      queryParam('search') +
      queryParam('languages') +
      queryParam('copyright') +
      queryParam('page');

    try {
      const response = await fetch(`https://gutendex.com/books?${query}`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { count, results: loadedBooks } = await response.json();

      setBooks(loadedBooks);
      setCount(count);
    } catch (e) {
      setError(e.message);
    }

    dispatch(historyActions.add(Object.fromEntries([...searchParams])));

    setIsLoading(false);
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      fetchBooksHandler();
    }
  }, [fetchBooksHandler]);
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
        <SearchForm
          defaultValues={{
            search: searchParams.get('search'),
            languages: searchParams.get('languages'),
            copyright: searchParams.get('copyright'),
          }}
        />
        <p className='search-results'>
          We have found <span className='bold'>{count}</span> books
        </p>
        <Fragment>{content}</Fragment>
      </div>
    </Wrapper>
  );
};

export default Search;
