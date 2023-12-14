import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faBell,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import nasalogo from "../Assets/nasalogo.png";
import "./Navbar.css";
import axios from "axios";
import { CartContext } from "./CreateContext";
import useAuth from "../Auth2/useAuth";
import SearchBar from "./SearchBar";


function Navbar() {
  const navRef = useRef();
  const { user } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    toggleDropdown();
    // Navigate to the products page with the selected category
    navigate(`/${category}`);
  };

  const handleSearch = (value) => {
    // Handle the search value, for now, let's navigate to a search results page
    navigate(`/search?query=${value}`);
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, [categoryFilter]);

  const fetchProductsByCategory = () => {
    if (categoryFilter !== null) {
      axios
        .get(`http://localhost:5555/api/products?category=${categoryFilter}`)
        .then((response) => {
          console.log(`Products fetched for category ${categoryFilter}:`, response.data);
        })
        .catch((error) => {
          console.error(`Error fetching products for category ${categoryFilter}:`, error);
        });
    }
  };

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className="headervik">
    <div className="headervikleft">
    <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>

      <h3><a href="/" style={{color:'black'}}>E-Commerce</a></h3>
    </div>


      <nav className="navvik" ref={navRef}>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>

        <a href="/">Home</a>

        <Link to='/SareesCategories' >
          <div className="dropdown">
            <button className="dropbtn">Sarees</button>
            {/* <div className="dropdown-content">
              <Link to="/Kanjeevaram" onClick={() => handleCategoryClick("Kanjeevaram")} className="extra">Kanjivaram Silk Sarees</Link>
              <Link to='/Mysore' onClick={() => handleCategoryClick("Mysore")} className="extra">Mysore Silk Sarees</Link>
              <Link to="/ProductList" onClick={() => handleCategoryClick("Chettinad")} className="extra">Chettinad Sarees</Link>
              <Link to='/Kasavu' onClick={() => handleCategoryClick("Kasavu")} className="extra">Kasavu Sarees</Link>
              <Link  onClick={() => handleCategoryClick("Gadwal")} className="extra">Gadwal Sarees</Link>
              <Link onClick={() => handleCategoryClick("Dharamavaram")} className="extra">Dharamavaram Sarees</Link>
              <Link onClick={() => handleCategoryClick("Pochampally")} className="extra">Pochampally Sarees</Link>
            </div> */}
          </div>
        </Link>

        <a href="/BlogPost">Blog</a>
        <a href="/ContactUs">Contact us</a>
      </nav>

      <SearchBar className="nav-searchbarvik" onSearch={handleSearch} />
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
          <div className="tooltip">
            No new notifications.. Stay tuned for more!!
          </div>
        </div>

        {user ? (
          <div onClick={() => navigate("/Profile")}>
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
