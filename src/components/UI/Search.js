import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Search.module.css';

const Search = ({ searchJob }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')?.trim() || '';

  const [searchText, setSearchText] = useState(searchQuery);

  useEffect(() => {
    let isMounted = true;

    const timeoutId = setTimeout(() => {
      if (isMounted && searchQuery) {
        setSearchText(searchQuery);
        searchJob(searchQuery);
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [searchQuery, searchJob]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchText)}`);
      await searchJob(searchText);
    }
  };

  return (
    <form className={classes['search-form']} onSubmit={handleSubmit}>
      <div className={classes['input-group']}>
        <label className="label-icon sr-only" htmlFor="searchText">
          <i className="material-icons">search</i>
        </label>
        <input
          id="searchText"
          type="text"
          className={classes['search-input']}
          placeholder="Type your search query here and press enter."
          value={searchText}
          onChange={handleChange}
        />
        <button type="submit">
          <i className="material-icons">search</i>
        </button>
      </div>
    </form>
  );
};

export default Search;
