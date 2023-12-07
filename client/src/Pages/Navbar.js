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
    navigate(`/products/category/${category}`);
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
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>

      <h3>E-Commerce</h3>

      <nav className="navvik" ref={navRef}>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>

        <a href="/">Home</a>

        <Link to="/ProductList">
          <div className="dropdown">
            <button className="dropbtn">Categories</button>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleCategoryClick("kids")}>Kids</a>
              <a href="#" onClick={() => handleCategoryClick("women")}>Women</a>
              <a href="#" onClick={() => handleCategoryClick("men")}>Men</a>
            </div>
          </div>
        </Link>

        <a href="/BlogPost">Blog</a>
        <a href="/ContactUs">Contact us</a>
      </nav>

      <SearchBar className="nav-searchbarvik" />
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
