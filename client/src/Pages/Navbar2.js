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


const Navbar2 = ({ onSearch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div>
      <Navbar expand="lg" className={styles.navbara}>
        <Container className={styles.navbarContainera}>
          <Navbar.Brand
            as={NavLink}
            to="/"
            style={{ color: "white" }}
            className="logovik"
          >
            E-Saree{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                style={{ color: "white" }}
                className={styles.navLink}
              >
                Home
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/SareesCategories2"
                style={{ color: "white" }}
                className={styles.navLink}
              >
                Saree
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/BlogPost"
                style={{ color: "white" }}
                className={styles.navLink}
              >
                Blog
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/ContactUs"
                style={{ color: "white" }}
                className={styles.navLink}
              >
                Contact Us
              </Nav.Link>
              <Nav.Link as={NavLink} className={styles.navLink}>
                <div className="nav-searchbarvik">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <button onClick={handleSearch}>
                    <IoSearchOutline />
                  </button>
                </div>
              </Nav.Link>
              <Nav.Link as={NavLink} className={styles.navLink}>
                <div className="navvik-right">
                  <Link to="/ProductForm">
                    <FontAwesomeIcon icon={faPlus} className="menu-icon" />
                  </Link>

                  <Link to="/cart" style={{ color: "white" }}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>{totalQuantity}</span>
                  </Link>

                  <div className="tooltip-container">
                    <FontAwesomeIcon
                      icon={faBell}
                      style={{ color: "white" }}
                      className="menu-icon"
                    />
                    <div className="tooltip">
                      No new notifications.. Stay tuned for more!!
                    </div>
                  </div>

                  {user ? (
                    <Link to="/Profile">
                    <FontAwesomeIcon icon={faUser} className="menu-icon" />
                  </Link>                  
                  ) : (
                    <Link to="/Login">
                      <FontAwesomeIcon icon={faUser} className="menu-icon" />
                    </Link>
                  )}
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
