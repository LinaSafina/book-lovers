import { useRef } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import searchAll from '../constants/searchAll';

const SearchForm = (props) => {
  const searchInputRef = useRef();
  const langInputRef = useRef();
  const copyrightInputRef = useRef();
  const navigate = useNavigate();
  const { search, languages, copyright } = props.defaultValues;

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredSearch = searchInputRef.current.value || searchAll;
    const enteredLang = langInputRef.current.value || searchAll;
    const enteredCopyright = copyrightInputRef.current.value || searchAll;

    if (
      search === enteredSearch &&
      copyright === enteredCopyright &&
      languages === enteredLang
    ) {
      return;
    }

    navigate({
      pathname: '',
      search: createSearchParams({
        search: enteredSearch,
        copyright: enteredCopyright,
        languages: enteredLang,
        page: 1,
      }).toString(),
    });
  };

  return (
    <form className='form search-form' onSubmit={submitFormHandler}>
      <div className='form__control'>
        <input ref={searchInputRef} defaultValue={search} />
      </div>
      <div className='form__control'>
        <select ref={langInputRef} defaultValue={languages}>
          <option disabled>Language</option>
          <option value=''>All</option>
          <option value='en'>English</option>
          <option value='fr'>French</option>
        </select>
      </div>
      <div className='form__control'>
        <select ref={copyrightInputRef} defaultValue={copyright}>
          <option disabled>Copyright</option>
          <option value=''>all</option>
          <option value='true'>yes</option>
          <option value='false'>no</option>
          <option value='null'>unknown</option>
        </select>
      </div>
      <div className='form__action'>
        <button className='button' type='submit'>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
