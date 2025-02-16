// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';


// function Search({ onSearch }) {
//   const [query, setQuery] = useState('');

//   const handleChange = (event) => {
//     const newQuery = event.target.value;
//     console.log(newQuery)
//     setQuery(newQuery);
//     // onSearch(newQuery);  // Automatically trigger search with each keystroke
//   };

//   return (
//     <div className="search-container">
//       <FontAwesomeIcon style={{color: 'grey'}} icon={faSearch} className="search-icon" />
//       <input
//         type="text"
//         value={query}
//         onChange={handleChange}
//         placeholder="Search..."
//         className="search-input"
//       />
//     </div>
//   );
// }

// export default Search;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material'; // Import Material-UI Button

function Search({ onSearch }) {
  let data = [];
  const [query, setQuery] = useState('');
  const [count, setCount] = useState([]);

  const applySearch = async (query) => {
        try {
          let extension = `/search?query=${query}`;
          let url = 'http://127.0.0.1:5000' + extension;
          const response = await fetch(url);
          const itemData = await response.json();
          setCount(itemData);
          data = count;
          console.log(data);
        }
        catch(error){console.log(error)}
      }
  
  useEffect(() => {
    applySearch();
  }, []);

  const handleChange = (event) => {
    setQuery(event.target.value);
    
  };

  const handleSearch = () => {
    console.log(query)
    applySearch(query);
    //search function here
    
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
        variant="contained" // Material-UI style
        sx={{
          backgroundColor: '#0c1456', // Background color
          color: 'white', // Text color
          '&:hover': { backgroundColor: '#020733' }, // Hover effect
          borderRadius: '50%', // Make the button round
          minWidth: '40px', // Set minimum width for a circular button
          height: '40px', // Set height for circular shape
          padding: 0, // Remove extra padding
        }}
      >
        <FontAwesomeIcon style={{ color: 'white', fontSize: '20px' }} icon={faSearch} className="search-icon" />
      </Button>
    </div>
  );
}

export default Search;


