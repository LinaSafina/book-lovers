import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Wrapper from '../components/Layout/Wrapper';

const HomePage = () => {
  const searchInputRef = useRef();
  const navigate = useNavigate();

  const submitSearchHandler = (event) => {
    event.preventDefault();

    const enteredSearchValue = searchInputRef.current.value;
    const bookTitle = enteredSearchValue.split(' ').join('+');

    navigate(`/search?title=${bookTitle}&page=${1}`);
  };

  return (
    <Wrapper>
      <div className='homepage'>
        <h2 className='homepage__title'>SEARCH THE CATALOG</h2>
        <form className='homepage__form' onSubmit={submitSearchHandler}>
          <div className='form__control'>
            <input className='input' ref={searchInputRef} />
          </div>
          <div className='form__action'>
            <button type='submit' className='button'>
              Search
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default HomePage;
