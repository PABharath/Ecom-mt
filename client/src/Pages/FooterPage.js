import React from 'react';
import './FooterPage.css';

import { Link } from 'react-router-dom';
import { scrollToTop } from "./scrollUtils";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="footer-container ">
      <div className="footer-wrapper">


      




        <div className="footer-section">
        <Link to="/information" onClick={scrollToTop}><h3 className='text12765'>INFORMATION</h3>
       
          <ul ><li>
            <li className='list45'>Terms & Conditions</li>
           
           <li className='list45'>Privacy Policy</li> 
           
            <li className='list45'>Help & Support</li>
           
            <li className='list45'>Return Policy</li>
           
            <li className='list45'>Explore More</li>
            </li>
          </ul></Link>
        </div>
        <div className="footer-section">
        <Link to="/Shop" onClick={scrollToTop}><h3 className='text12765'>SHOP</h3>
       
          <ul><li>
            <li className='list45'>Wedding</li>
           
            <li className='list45'>Casual</li>
            
            <li className='list45'>Video Shopping</li>
            </li>
          </ul></Link>
        </div>
        <div className="footer-section">
        <Link to="/ContactUs" onClick={scrollToTop}><h3 className='text12765'>CONTACT US</h3>
        
          <ul ><li>
            <li className='list45'> <FaPhoneAlt />Phone Number</li>
           
            <li className='list45'>  <MdOutlineMailOutline />
Email</li>
          
            <li className='list45'>    <IoLocationOutline />
Location</li>
            </li>
          </ul></Link>
        </div>
        <div className="footer-section">
          <h3 className='text12765'>Follow Us On</h3>
         
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
      <br/>
        <p>&copy; 2023 Your Ecommerce Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;