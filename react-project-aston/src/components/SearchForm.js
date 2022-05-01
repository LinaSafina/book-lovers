import { useRef, useState, useCallback, useEffect } from 'react';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';
import debounce from 'lodash.debounce';

import searchAll from '../constants/searchAll';

const SearchForm = (props) => {
  const searchInputRef = useRef();
  const langInputRef = useRef();
  const copyrightInputRef = useRef();
  const navigate = useNavigate();
  const { search, languages, copyright } = props.defaultValues;
  const [searchInput, setSearchInput] = useState('');
  const [langInput, setLangInput] = useState('');
  const [copyrightInput, setCopyrightInput] = useState('');
  const [searchParams] = useSearchParams();
  let isFirstLoading = true;

  const submitFormHandler = (e) => {
    e.preventDefault();

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

  const delayedSearchHandler = () => {
    navigate({
      pathname: '',
      search: createSearchParams({
        search: searchInputRef.current.value,
        copyright: copyrightInputRef.current.value,
        languages: langInputRef.current.value,
        page: searchParams.get('page') || 1,
      }).toString(),
    });
  };

  const delayedSearch = useCallback(debounce(delayedSearchHandler, 1000), [
    searchInput,
    langInput,
    copyrightInput,
  ]);

  const changeInputHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const changeLangHandler = (e) => {
    setLangInput(e.target.value);
  };
  const changeCopyrightHandler = (e) => {
    setCopyrightInput(e.target.value);
  };

  useEffect(() => {
    if (isFirstLoading) {
    } else {
      delayedSearch();

      return delayedSearch.cancel;
    }
  }, [searchInput, langInput, copyrightInput, delayedSearch, isFirstLoading]);

  isFirstLoading = false;

  return (
    <form className='form search-form' onSubmit={submitFormHandler}>
      <div className='form__control'>
        <input
          ref={searchInputRef}
          onChange={changeInputHandler}
          defaultValue={search}
        />
      </div>
      <div className='form__control'>
        <select
          ref={langInputRef}
          defaultValue={languages}
          onChange={changeLangHandler}
        >
          <option disabled>Language</option>
          <option value={searchAll}>All</option>
          <option value='en'>English</option>
          <option value='fr'>French</option>
        </select>
      </div>
      <div className='form__control'>
        <select
          ref={copyrightInputRef}
          defaultValue={copyright}
          onChange={changeCopyrightHandler}
        >
          <option disabled>Copyright</option>
          <option value={searchAll}>all</option>
          <option value='true'>yes</option>
          <option value='false'>no</option>
          <option value='null'>unknown</option>
        </select>
      </div>
      <div className='form__action'>
        {/* <button className='button' type='submit'>
          Search
        </button> */}
      </div>
    </form>
  );
};

export default SearchForm;
