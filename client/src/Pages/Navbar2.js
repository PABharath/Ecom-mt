import React, { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBell, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';

import { CartContext } from './CreateContext';
import useAuth from '../Auth2/useAuth';
import { IoSearchOutline } from "react-icons/io5";



import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { LuImagePlus } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";




import './Navbar2.css'
 
const Navbar2 = (onSearch) => {
const [click, setClick] = useState(false)
const handleClick = () => setClick(!click)
const navRef = useRef();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const { cartItems } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
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
  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    onSearch(searchQuery);
  };
    

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };
 
 
    return (
        <div className='headervik'>
             <a href='/' className='logovik' >E-Saree</a>
            <div className='containervik'>
               
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <a href='/'>Home</a>
                    </li>
                    <li>
                        <a href='/SareesCategories2'>Sarees</a>
                    </li>
                    <li>
                        <a href='/BlogPost'>Blog</a>
                    </li>
                    <li>
                        <a href='/ContactUs'>Contact Us</a>
                    </li>
                    <li className='nav-searchbarvik'>
                    <input
                type="text"
                placeholder="Search patients"
              
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
               
              />
             
                <button 
                  onClick={handleSearch} >
                <IoSearchOutline/>
                </button>
             
                    </li>

                    <li>
                    <div className="navvik-right">
        <Link to="/ProductForm">
          <FontAwesomeIcon icon={faPlus} className="menu-icon" />
        </Link>

        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>{totalQuantity}</span>
        </Link>

        <div className="tooltip-container">
          <FontAwesomeIcon icon={faBell} style={{color:'white'}} className="menu-icon" />
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

<Button  ref={target} style={{backgroundColor:'#8eab92',color:'white',border:'none'}}  onClick={() => setShow(!show)}>
           
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


                    </li>
                    




                </ul>
                
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={20} style={{color: 'white',marginTop:'-1rem'}}/>) : (<FaBars size={20} style={{color: 'white',marginTop:'-1rem'}} />)}
                     
                </div>
            </div>
        </div>
    )
}
 
export default Navbar2