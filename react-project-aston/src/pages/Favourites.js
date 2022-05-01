import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import FavouritesList from '../components/FavouritesList';
import Wrapper from '../components/Layout/Wrapper';
import Loading from '../components/Layout/Loading';
import { useGetBooksByIdsQuery } from '../store/api-slice';

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites);
  const { email: user } = useSelector((state) => state.user);

  const arrayOfIds = Object.keys(favourites);
  const ids = arrayOfIds?.join(',') || -1;

  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBooksByIdsQuery(ids);

  let content = (
    <p className='info'>Add your first book in the list of Favourites.</p>
  );

  if (isLoading) {
    content = <Loading />;
  }

  if (isSuccess && books.length > 0) {
    content = <FavouritesList books={books} />;
  }

  if (isError) {
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
