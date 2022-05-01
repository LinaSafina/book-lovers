import { Fragment } from 'react';
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from 'react-router-dom';

import BookList from '../components/BookList';
import Loading from '../components/Layout/Loading';
import Wrapper from '../components/Layout/Wrapper';
import SearchForm from '../components/SearchForm';
import searchAll from '../constants/searchAll';
import searchCategories from '../constants/searchCategories';
import { useGetBooksQuery } from '../store/api-slice';
import Pagination from '../components/Layout/Pagination';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageChangeHandler = (clickedPage) => {
    const currentSearchParams = { ...filteredSearchParams, page: clickedPage };
    navigate({
      path: '',
      search: createSearchParams(currentSearchParams).toString(),
    });
  };

  const filterLogic = (param) => {
    return searchCategories.some(
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
    console.log(count);

    if (books.length > 0) {
      console.log(books);
      content = (
        <>
          <p className='search-results'>
            We have found <span className='bold'>{count}</span> books
          </p>
          <Pagination
            pagination={{
              onPageChange: pageChangeHandler,
              totalCount: count,
              currentPage: parseInt(searchParams.get('page')) || 1,
              pageSize: 32,
            }}
          />
          <BookList books={books} searchParams={[...searchParams]} />;
          <Pagination
            pagination={{
              onPageChange: pageChangeHandler,
              totalCount: count,
              currentPage: parseInt(searchParams.get('page')) || 1,
              pageSize: 32,
            }}
          />
        </>
      );
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

        <>{content}</>
      </div>
    </Wrapper>
  );
};

export default Search;
