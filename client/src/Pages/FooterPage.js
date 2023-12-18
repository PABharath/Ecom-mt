import React from 'react';
import './FooterPage.css';

import { Link } from 'react-router-dom';
import { scrollToTop } from "./scrollUtils";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { SlCallEnd } from "react-icons/sl";




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
            <li className='list45'> <SlCallEnd />&nbsp;Phone Number</li>
           
            <li className='list45'>  <MdOutlineMailOutline />&nbsp;
Email</li>
          
            <li className='list45'>    <IoLocationOutline />&nbsp;
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
          <ul>
            <br/>
            <li>
              <h3  className='text12765'>Payment</h3>
              
              <FaCcVisa className='list45' style={{fontSize:'1.5rem'}} /> &nbsp;

              <FaCcMastercard className='list45' style={{fontSize:'1.5rem'}}/>&nbsp;

              <FaCcPaypal className='list45' style={{fontSize:'1.5rem'}} />&nbsp;

              <SiRazorpay className='list45'  style={{fontSize:'1.5rem'}} />


              



            </li>
            <l1>
              
            </l1>
          </ul>
        </div>
      </div>
      <div className="footer-bottom"><hr/>
      <br/>
        <p>&copy; 2023 Matrical Technologies. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;