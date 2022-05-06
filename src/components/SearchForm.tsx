import React, { useState, useCallback, useEffect } from 'react';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import debounce from 'lodash.debounce';

import searchAll from '../constants/searchAll';

let isFirstLoading = true;

const SearchForm: React.FC<{
  defaultValues: { search: string; languages: string; copyright: string };
}> = (props) => {
  const navigate = useNavigate();
  const { search, languages, copyright } = props.defaultValues;
  const [searchInput, setSearchInput] = useState<string>(search);
  const [langInput, setLangInput] = useState<string>(languages);
  const [copyrightInput, setCopyrightInput] = useState<string>(copyright);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const pathname = location.pathname;

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const delayedSearchHandler = useCallback(() => {
    const newSearchParams = createSearchParams({
      search: searchInput || searchAll,
      copyright: copyrightInput,
      languages: langInput,
      page: searchParams.get('page') || '1',
    }).toString();

    if (searchParams.toString() === newSearchParams) {
      return;
    }

    navigate(`?${newSearchParams}`, { state: { previousPage: pathname } });
  }, [
    copyrightInput,
    langInput,
    navigate,
    searchInput,
    searchParams,
    pathname,
  ]);

  const delayedSearch = useCallback(debounce(delayedSearchHandler, 1000), [
    searchInput,
    langInput,
    copyrightInput,
  ]);

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const changeLangHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLangInput(e.target.value);
  };
  const changeCopyrightHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCopyrightInput(e.target.value);
  };

  useEffect(() => {
    if (isFirstLoading) {
      isFirstLoading = false;

      return;
    }

    delayedSearch();

    return delayedSearch.cancel;
  }, [searchInput, langInput, copyrightInput, delayedSearch]);

  return (
    <form className='form search-form' onSubmit={submitFormHandler}>
      <div className='form__control'>
        <input value={searchInput} onChange={changeInputHandler} />
      </div>
      <div className='form__control'>
        <select value={langInput} onChange={changeLangHandler}>
          <option disabled>Language</option>
          <option value={searchAll}>All</option>
          <option value='en'>English</option>
          <option value='fr'>French</option>
        </select>
      </div>
      <div className='form__control'>
        <select value={copyrightInput} onChange={changeCopyrightHandler}>
          <option disabled>Copyright</option>
          <option value={searchAll}>all</option>
          <option value='true'>yes</option>
          <option value='false'>no</option>
        </select>
      </div>
    </form>
  );
};

export default SearchForm;
