import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // Pass the latest input value directly
  };

  const handleSearch = () => {
    onSearch(query); // Now the search button also triggers filtering
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="search-input"
      />
      <Button
        onClick={handleSearch}
        className="search-button"
        variant="contained"
        sx={{
          backgroundColor: '#0c1456',
          color: 'white',
          '&:hover': { backgroundColor: '#020733' },
          borderRadius: '50%',
          minWidth: '40px',
          height: '40px',
          padding: 0,
        }}
      >
        <FontAwesomeIcon style={{ color: 'white', fontSize: '20px' }} icon={faSearch} />
      </Button>
    </div>
  );
}

export default Search;
