import Wrapper from '../components/Layout/Wrapper';

const HomePage = () => {
  return (
    <Wrapper>
      <div className='homepage'>
        <h2 className='homepage__title'>SEARCH THE CATALOG</h2>
        <form className='homepage__form'>
          <input className='input' />
          <button className='button'>Search</button>
        </form>
      </div>
    </Wrapper>
  );
};

export default HomePage;
