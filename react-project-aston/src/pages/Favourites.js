import { useSelector } from 'react-redux';

import BookList from '../components/BookList';
import Wrapper from '../components/Layout/Wrapper';

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.favourites);
  const isNotEmpty = favourites.length > 0;

  return (
    <Wrapper>
      <div className='favourites'>
        {isNotEmpty && <BookList books={favourites} />}
        {!isNotEmpty && (
          <p className='info'>Add your first book in the list of Favourites</p>
        )}
      </div>
    </Wrapper>
  );
};

export default Favourites;
