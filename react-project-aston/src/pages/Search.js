import { Fragment, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { historyActions } from '../store/history-slice';
import BookList from '../components/BookList';
import Loading from '../components/Layout/Loading';
import Wrapper from '../components/Layout/Wrapper';
import SearchForm from '../components/SearchForm';
import searchAll from '../constants/searchAll';
import { useGetBooksQuery } from '../store/api-slice';

const Search = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const queryParam = (param) => {
    const queryParam = searchParams.get(param);
    return (
      (queryParam && queryParam !== searchAll && `${param}=${queryParam}&`) ||
      ''
    );
  };

  const query =
    queryParam('search') +
    queryParam('languages') +
    queryParam('copyright') +
    queryParam('page');

  const { data, isLoading, isSuccess, isError, error } =
    useGetBooksQuery(query);

  let count = 0;

  let content = (
    <p className='info'>
      Sorry, we couldn't find any books. Change the search parameters and try
      again.
    </p>
  );

  if (isLoading) {
    console.log('loading...')
    content = <Loading />;
  }

  if (isSuccess) {
    if (isFirstLoading) {
      setIsFirstLoading(false);
      return;
    }
    console.log(data);
    const { results: books } = data;
    count = data.count;
    dispatch(historyActions.add(Object.fromEntries([...searchParams])));

    if (books.length > 0) {
      content = <BookList books={books} />;
    }
  }

  if (isError) {
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
