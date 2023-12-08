import React from 'react';
import './FooterPage.css';
import { Link } from 'react-router-dom';
import { scrollToTop } from "./scrollUtils";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-section">
        <Link to="/information" onClick={scrollToTop}><h3>INFORMATION</h3>
          <ul><li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Help & Support</li>
            <li>Return Policy</li>
            <li>Explore More</li>
            </li>
          </ul></Link>
        </div>
        <div className="footer-section">
        <Link to="/Shop" onClick={scrollToTop}><h3>SHOP</h3>
          <ul><li>
            <li>Wedding</li>
            <li>Casual</li>
            <li>Video Shopping</li>
            </li>
          </ul></Link>
        </div>
        <div className="footer-section">
        <Link to="/ContactUs" onClick={scrollToTop}><h3>CONTACT US</h3>
          <ul><li>
            <li>PhoneNumber</li>
            <li>Email</li>
            <li>Location</li>
            </li>
          </ul></Link>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-media-icons">
            <li>
              <a href="https://www.facebook.com">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom"><hr/>
        <p>&copy; 2023 Matrical Techonologies. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
