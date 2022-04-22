import { useEffect, useState, useCallback, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  // const paramsFilter =(param[1] !== 'all' || param[1] !== '') &&
  //       (param[0] === 'search' ||
  //         param[0] === 'language' ||
  //         param[0] === 'copyright' ||
  //         param[0] === 'page')

  const validateSearchParam = (param) => {
    console.log(searchParams.get('copyright') !== 'all');
    return (
      (param === 'search' ||
        param === 'language' ||
        param === 'copyright' ||
        param === 'page') &&
      searchParams.get(param) !== 'all' &&
      searchParams.get(param) !== ''
    );
  };

  const filteredParams = [...searchParams]
    .filter((param) => validateSearchParam(param[0]))
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
      setCount(count);
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
    content = <BookList books={books} count={count} />;
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
        <Fragment>{content}</Fragment>
      </div>
    </Wrapper>
  );
};

export default Search;
