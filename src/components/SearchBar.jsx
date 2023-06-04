import React, { useState } from 'react';

const SearchBar = ({ callback }) => {
  const [innerValue, setInnerValue] = useState('');

  const handleSearch = (e) => {
    setInnerValue(e.target.value);
    callback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='container-header'>
      <h3>Test Table</h3>
      <div>
        <form className='searchBar' onSubmit={handleSubmit}>
          <input
            type='text'
            className='searchBarInput'
            value={innerValue}
            onChange={handleSearch}
            placeholder='Filter'
          />
          <button className='button-5' role='button'>
            Filter
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
