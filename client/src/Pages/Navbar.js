import React, { useRef, useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBell, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';

import { CartContext } from './CreateContext';
import useAuth from '../Auth2/useAuth';
import { IoSearchOutline } from "react-icons/io5";

import './Navbar.css';

function Navbar({ onSearch }) {
  const navRef = useRef();
  const { user } = useAuth();
  const navigate = useNavigate();



  const { cartItems } = useContext(CartContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    setShowDropdown(!showDropdown);
    navigate(`/${category}`);
  };
  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    onSearch(searchQuery);
  };

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(`/api/products?search=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
    

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
  };;

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  return (
    <header className="headervik">
      <div className="headervikleft">
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
        <h3>
          <a href="/" style={{ color: 'black' }}>
            E-Commerce
          </a>
        </h3>
      </div>

      <nav className="navvik" ref={navRef}>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
        <a href="/">Home</a>
        <Link to="/Kasavu">
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>
              Sarees
            </button>
          </div>
        </Link>
        <a href="/BlogPost">Blog</a>
        <a href="/ContactUs">Contact us</a>
      </nav>

      <div className="search-container321">
      <input
          type="text"
          placeholder="Search patients"
          className="search-bar-doc1"
          value={searchQuery}
          onChange={handleInputChange}
          style={{
                  width:"250px",
                  height:"37px",
                  // fontFamily: "Inria Serif",
                  marginRight: "0px",
                  borderRight:'transparent',
                  borderLeft:"transparent",
                  borderTop:'transparent',
                  borderBottom:'transparent',
                  outlineWidth:'0px'
                   }}
              />
              <div className="searching321Button"><br/>
              <button 
                  onClick={handleSearch}
                  className="weyh"
                  // style={{
                  //   color: "white",
                  //   background: "#3E6EA8",
                  //   border: "none",
                  //     }}
                >
                <IoSearchOutline style={{height:'34.4px',width:'23px'}}/>
                </button>
              </div>
            </div>



            {showDropdown && searchResults.length > 0 && (
          <div className="search-dropdown">
            <ul>
              {searchResults.map((product) => (
                <li key={product.id} onClick={() => handleCategoryClick(product.category)}>
                  {product.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {searchResults.length === 0 && showDropdown && (
          <div className="no-data-found">No data found for "{searchQuery}"</div>
        )}
      





      <div className="navvik-right">
        <Link to="/ProductForm">
          <FontAwesomeIcon icon={faPlus} className="menu-icon" />
        </Link>

        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>{totalQuantity}</span>
        </Link>

        <div className="tooltip-container">
          <FontAwesomeIcon icon={faBell} className="menu-icon" />
          <div className="tooltip">No new notifications.. Stay tuned for more!!</div>
        </div>

        {user ? (
          <div onClick={() => navigate('/Profile')}>
            <FontAwesomeIcon icon={faUser} className="menu-icon" />
          </div>
        ) : (
          <Link to="/Login">
            <FontAwesomeIcon icon={faUser} className="menu-icon" />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
