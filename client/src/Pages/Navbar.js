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
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { LuImagePlus } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";

function Navbar({ onSearch }) {
  const navRef = useRef();
  const { user } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();



  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(null);

 

    const [show, setShow] = useState(false);
    const target = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    setShowDropdown(!showDropdown);
    navigate(`/${category}`);
  };

  const handleSearch = (value) => {
    // Handle the search value, for now, let's navigate to a search results page
    navigate(`/search?query=${value}`);
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
            <button className="dropbtn">Sarees</button>
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

          <Button  ref={target} style={{backgroundColor:'rgb(206, 202, 202)',color:'black',border:'none'}}  onClick={() => setShow(!show)}>
           
        <FaUserCircle style={{fontSize:'1.2rem' , marginTop:'-1rem',marginLeft:'-0.8rem'}}/>
    
      </Button>
      
      <Overlay target={target.current} show={show}   placement="bottom">
        {(props) => (
          
          <Tooltip id="overlay-example"  {...props}>
            <div >
            <h4>Profile</h4>
            <FaUserCircle style={{fontSize:'2rem'}}/><br/>
             <b>Username:</b><br/>
           <input type="text" placeholder="Username"/><br/><br/>
                      
              
             <button className="bg-button1">logout</button><br/><br/>
             <button className="bg-button2"><PiSignOutBold/>Profile</button> 
              <br/>
            </div>
          </Tooltip>
          
        )}
      </Overlay>
       
      </div>
    </header>
  );
}

export default Navbar;
