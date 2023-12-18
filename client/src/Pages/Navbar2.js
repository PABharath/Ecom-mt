
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import React, { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBell, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';


import { CartContext } from './CreateContext';
import useAuth from '../Auth2/useAuth';
import { IoSearchOutline } from "react-icons/io5";



import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { PiSignOutBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";

import './Navbar2.css'




const Navbar2 = (onSearch) => {


   
  const { user } = useAuth();
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [show, setShow] = useState(false);
    const target = useRef(null);

  

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    onSearch(searchQuery);
  };
    

  




  return (
    <div>
    <Navbar  expand="lg" className={styles.navbar}>
      <Container className={styles.navbarContainer}>
        <Navbar.Brand as={NavLink} to="/" style={{color:'white'}} className='logovik' >E-Saree </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

          <Nav.Link as={NavLink} to="/" style={{color:'white'}} className={styles.navLink}>
              Home
            </Nav.Link>
           
            <Nav.Link as={NavLink} to="/SareesCategories2" className={styles.navLink}>
              Saree
            </Nav.Link>
            <Nav.Link as={NavLink} to="/BlogPost" className={styles.navLink}>
              Blog
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ContactUs" className={styles.navLink}>
              Contact Us
            </Nav.Link>
            <Nav.Link as={NavLink}  className={styles.navLink}>

            <input
                type="text"
                placeholder="Search patients"
              
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
               
              />
             
                <button 
                  onClick={handleSearch}  style={{border:'none'}}>
                   
                <IoSearchOutline/>
                </button>
             
            


            </Nav.Link>
            <Nav.Link as={NavLink}  className={styles.navLink}>


                 <div className="navvik-right">
        <Link to="/ProductForm">
          <FontAwesomeIcon icon={faPlus} className="menu-icon" />
        </Link>

        <Link to="/cart" style={{color:'white'}}>
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





            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default Navbar2;