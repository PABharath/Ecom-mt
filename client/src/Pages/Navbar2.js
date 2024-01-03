import {faBell,faPlus,faShoppingCart,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Auth2/useAuth";
import { CartContext } from "./CreateContext";
import styles from "./NavBar.module.css";
import Search from "./Search";
import { FaPlus  } from "react-icons/fa";

import { FaUserCircle } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import Popup from "reactjs-popup";
import "./Navbar2.css";

const Navbar2 = ({ onSearch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // const [token] = useState(localStorage.getItem("token"));
  const { cartItems } = useContext(CartContext);
  // const [searchQuery,] = useState("");
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  
  const handleLogout = () => {
    // Clear the token

    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/Login");
  };

  return (
    <div className="nav1" style={{ zIndex: 1000 }}>
      <Navbar expand="lg" className={`${styles.navbara} fixed-top`}>
        <Container className={styles.navbarContainera}>
          <Navbar.Brand as={NavLink} to="/" className="logovik">
            <h3 className="navbar-h3">E-Saree</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-autovik">
              <Nav.Link
                as={NavLink}
                to="/"
                className="navLink"
                style={{ fontWeight: "bold", fontSize: "18px" }}
              >
                Home
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/SareesCategories2"
                className="navLink"
                style={{ fontWeight: "bold", fontSize: "18px" }}
              >
                Saree
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/BlogPost"
                className="navLink"
                style={{ fontWeight: "bold", fontSize: "18px" }}
              >
                Blog
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/ContactUs"
                className="navLink"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginLeft: "10px",
                }}
              >
                Contact Us
              </Nav.Link>
              <Search />
              <div className="navvik-right">
                {user && user.role === "admin" && (
                  <div className="prod-form">
                    <Link to="/ProductForm">
                      <FontAwesomeIcon icon={faPlus} className="menu-icon" />
                    </Link>
                  </div>
                )}
                <div className="tooltip-container">
                 <Link to='/ProductForm'>< FaPlus  className="menu-icon" /></Link> 
                  {/* <div className="tooltip">
                    No new notifications.. Stay tuned for more!!
                  </div> */}
                </div>
                <Link to="/cart">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="menu-icon-cart"
                  />
                  <span>{totalQuantity}</span>
                </Link>

                <div className="tooltip-container">
                  <FontAwesomeIcon icon={faBell} className="menu-icon" />
                  <div className="tooltip">
                    No new notifications.. Stay tuned for more!!
                  </div>
                </div>

                

                

                {/* <h4>Popup - GeeksforGeeks</h4> */}
                <Popup
                  trigger={
                    <button
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "none",
                      }}
                    >
                      <FaUserCircle className="pop2" />
                    </button>
                  }
                  position="bottom left"
                >
                  <div className="pop1">
                    <button onClick={handleLogout}>Logout</button>
                    <br />
                    <br />
                    <Link to="/Profile">
                      <button>
                        <PiSignOutBold className="pop3" />
                        Profile
                      </button>
                    </Link>
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
