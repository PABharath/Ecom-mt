import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/search?query=${searchValue}`);
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
            <li key={result._id}>
              <Link to={`/products/${result._id}`}>{result.productName}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;