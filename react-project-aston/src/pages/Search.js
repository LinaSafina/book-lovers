import { Fragment } from 'react';
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { historyActions } from '../store/history-slice';
import BookList from '../components/BookList';
import Loading from '../components/Layout/Loading';
import Wrapper from '../components/Layout/Wrapper';
import SearchForm from '../components/SearchForm';
import searchAll from '../constants/searchAll';
import { useGetBooksQuery } from '../store/api-slice';
import Pagination from '../components/Layout/Pagination';

const Search = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterLogic = (param) => {
    return ['search', 'copyright', 'languages', 'page'].some(
      (elem) => param[0] === elem && param[1] !== searchAll
    );
  };

  const filteredSearchParams = Object.fromEntries(
    [...searchParams].filter(filterLogic)
  );

  const query = createSearchParams(filteredSearchParams).toString();

  const { data, isFetching, isSuccess, isError, error } =
    useGetBooksQuery(query);

  let count = 0;

  let content = (
    <p className='info'>
      Sorry, we couldn't find any books. Change the search parameters and try
      again.
    </p>
  );

  if (isFetching) {
    content = <Loading />;
  }

  if (isSuccess) {
    const { books } = data;
    count = data.count;

    dispatch(historyActions.add(Object.fromEntries([...searchParams])));

    if (books.length > 0) {
      content = <BookList books={books} />;
    }
  }

  if (isError) {
    content = <p className='info'>{error}</p>;
  }

  const pageChangeHandler = (clickedPage) => {
    const currentSearchParams = { ...filteredSearchParams, page: clickedPage };
    navigate({
      path: '',
      search: createSearchParams(currentSearchParams).toString(),
    });
  };

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
        <Pagination
          pagination={{
            onPageChange: pageChangeHandler,
            totalCount: count,
            currentPage: parseInt(searchParams.get('page')),
            pageSize: 32,
          }}
        />
        <Fragment>{content}</Fragment>
        <Pagination
          pagination={{
            onPageChange: pageChangeHandler,
            totalCount: count,
            currentPage: parseInt(searchParams.get('page')),
            pageSize: 32,
          }}
        />
      </div>
    </Wrapper>
  );
};

export default Search;
