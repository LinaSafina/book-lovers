import { useEffect, useState, useCallback, Fragment } from 'react';
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
  let isFirstLoading = true;

  const fetchBooksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const validateSearchParam = (param) => {
      console.log('validate');
      return (
        (param === 'search' ||
          param === 'languages' ||
          param === 'copyright' ||
          param === 'page') &&
        searchParams.get(param) !== 'all' &&
        searchParams.get(param) !== ''
      );
    };

    const filteredParams = [...searchParams].filter((param) =>
      validateSearchParam(param[0])
    );
    const query = filteredParams.reduce(
      (prev, curr) => prev + `${curr[0]}=${curr[1]}&`,
      ''
    );

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

    dispatch(historyActions.add(Object.fromEntries(filteredParams)));

    setIsLoading(false);
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (isFirstLoading) {
      fetchBooksHandler();
      isFirstLoading = false;
    }
  }, [fetchBooksHandler, isFirstLoading]);
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
            language: searchParams.get('language'),
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
