import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5055/`, {
          params: { query: searchValue },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    if (searchValue.trim() !== '') {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleResultClick = (productId) => {
    // Handle navigation to the product page, for example using React Router
    // You can replace the following line with your actual navigation logic
    console.log(`Navigate to product page with ID: ${productId}`);
  };
    

  
  

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search for products, brands, and more"
        value={searchValue}
        onChange={handleInputChange}
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />

      {/* Display suggestions in real-time */}
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((result) => (
            <li key={result._id} onClick={() => handleResultClick(result._id)}>
              {result.productName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;