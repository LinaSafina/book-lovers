import { useRef } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

const SearchForm = (props) => {
  const searchInputRef = useRef();
  const langInputRef = useRef();
  const copyrightInputRef = useRef();
  const navigate = useNavigate();

  const submitFormHandler = (event) => {
    event.preventDefault();

    navigate({
      pathname: '',
      search: createSearchParams({
        search: searchInputRef.current.value,
        copyright: copyrightInputRef.current.value,
        languages: langInputRef.current.value,
        page: 1,
      }).toString(),
    });
  };

  return (
    <form className='form search-form' onSubmit={submitFormHandler}>
      <div className='form__control'>
        <input ref={searchInputRef} defaultValue={props.defaultValue} />
      </div>
      <div className='form__control'>
        <select ref={langInputRef}>
          <option disabled>Language</option>
          <option value=''>All</option>
          <option value='en'>English</option>
          <option value='fr'>French</option>
        </select>
      </div>
      <div className='form__control'>
        <select ref={copyrightInputRef}>
          <option disabled>Copyright</option>
          <option value=''>all</option>
          <option value='true'>yes</option>
          <option value='false'>no</option>
          <option value='null'>unknown</option>
        </select>
      </div>
      <div className='form__action'>
        <button type='submit'>Search</button>
      </div>
    </form>
  );
};

export default SearchForm;
