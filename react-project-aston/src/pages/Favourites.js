import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import BookList from '../components/BookList';
import Wrapper from '../components/Layout/Wrapper';
import useFetch from '../hooks/use-fetch';
import Loading from '../components/Layout/Loading';

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites);
  const { email: user } = useSelector((state) => state.user);
  const arrayOfIds = Object.keys(favourites);
  const { fetchBooksHandler, data, error, isLoading } = useFetch(
    `?ids=${arrayOfIds?.join(',') || -1}`
  );
  const books = data?.results;

  useEffect(() => {
    const fetchData = async () => await fetchBooksHandler();
    fetchData();
  }, [fetchBooksHandler]);

  let content = (
    <p className='info'>Add your first book in the list of Favourites.</p>
  );

  if (books?.length > 0) {
    content = <BookList books={books} />;
  }

  if (isLoading) {
    content = <Loading />;
  }

  if (error) {
    content = <p className='info'>{error}</p>;
  }

  if (!user) {
    return <Navigate to='/signin' replace />;
  }

  return (
    <Wrapper>
      <div className='favourites'>{content}</div>
    </Wrapper>
  );
};

export default Favourites;
