import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import BookList from '../components/BookList';
import Wrapper from '../components/Layout/Wrapper';
import useFetch from '../hooks/use-fetch';
import Loading from '../components/Layout/Loading';

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.favourites); //{id:true}
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

  return (
    <Wrapper>
      <div className='favourites'>{content}</div>
    </Wrapper>
  );
};

export default Favourites;
