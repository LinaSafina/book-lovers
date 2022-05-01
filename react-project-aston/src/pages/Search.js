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

  const filterValidParams = (param) => {
    return searchCategories.some((elem) => param[0] === elem);
  };

  const filterEmptyParams = (param) => {
    return param[1] !== searchAll;
  };

  const filteredSearchParams = Object.fromEntries(
    [...searchParams].filter(filterValidParams).filter(filterEmptyParams)
  );

  const query = createSearchParams(filteredSearchParams).toString();

  const { data, isFetching, isSuccess, isError, error } =
    useGetBooksQuery(query);

  const pageChangeHandler = (clickedPage) => {
    const currentSearchParams = { ...filteredSearchParams, page: clickedPage };
    navigate({
      path: '',
      search: createSearchParams(currentSearchParams).toString(),
    });
  };

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

    if (books.length > 0) {
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
          <BookList
            books={books}
            searchParams={[...searchParams]
              .filter(filterValidParams)
              .filter((param) => param !== 'page')}
          />
          ;
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
