import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBell,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { CartContext } from "./CreateContext";
import useAuth from "../Auth2/useAuth";
import { IoSearchOutline } from "react-icons/io5";

import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { PiSignOutBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar2.css";
import Popup from 'reactjs-popup';

const Navbar2 = ({ onSearch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [token,] = useState(localStorage.getItem('token'));
  const { cartItems } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    // Clear the token
    
    localStorage.removeItem('token')
    
    // Redirect to the login page
    navigate('/Login');
  }
  
  
  


  return (
    <div>
   <Navbar  expand="lg" className={styles.navbara}>
      <Container className={styles.navbarContainera}>
        <Navbar.Brand as={NavLink} to="/"  className='logovik' >
        <h3>E-Saree</h3>
         </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-autovik">

          <Nav.Link as={NavLink} to="/"  className={styles.navLink}>
            Home
            </Nav.Link>
           
            <Nav.Link as={NavLink} to="/SareesCategories2"  className={styles.navLink}>
              Saree
            </Nav.Link>
            <Nav.Link as={NavLink} to="/BlogPost"  className={styles.navLink}>
              Blog
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ContactUs"  className={styles.navLink}>
              Contact Us
            </Nav.Link>
            <div className='nav-searchbarvik'>

            <input
                type="text"
                placeholder="Search"
              
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
               
              />
             
                <button 
                  onClick={handleSearch}  >
                   
                <IoSearchOutline/>
                </button>
                </div>
             
            




              <div className="navvik-right">
                <Link to="/ProductForm">
                  <FontAwesomeIcon icon={faPlus} className="menu-icon" />
                </Link>

        <Link to="/cart" >
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>{totalQuantity}</span>
        </Link>

        <div className="tooltip-container">
          <FontAwesomeIcon icon={faBell}  className="menu-icon" />
          <div className="tooltip">No new notifications.. Stay tuned for more!!</div>
        </div>

        {token ? (
          <div onClick={() => navigate('/Profile')}>
            <FontAwesomeIcon icon={faUser} className="menu-icon" />
          </div>
        ) : (
          <Link to="/Login">
            <FontAwesomeIcon icon={faUser} className="menu-icon" />
          </Link>
        )}

{/* <Button  ref={target} style={{backgroundColor:'white',color:'white',border:'none'}}  onClick={() => setShow(!show)}>
           
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
                <Link to='/Login'>         
                {/* <button onClick={handleLogout}>Logout</button> */}
                {/* {/* </Link> */}
                {/* <button className="bg-button1" onClick={handleLogout}>logout</button><br/><br/>
                <button className="bg-button2"><PiSignOutBold/>Profile</button> 
                 <br/>
               </div>
             </Tooltip>
             
           )}
         </Overlay> */}

      {/* <h4>Popup - GeeksforGeeks</h4> */}
            <Popup trigger=
                {<button style={{backgroundColor:"white",color:'black',border:'none'}}><FaUserCircle className="pop2"/></button>}
                position="bottom left">
                <div className="pop1">
                <button onClick={handleLogout}>Logout</button><br/><br/>
           <Link to='/Profile'><button ><PiSignOutBold className="pop3"/>Profile</button></Link> 
                </div>
            </Popup>
            </div>





           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default Navbar2;