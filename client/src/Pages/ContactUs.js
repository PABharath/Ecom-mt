import React, { useState  } from "react";
import axios from "axios";
import "./ContactUs.css";
import Navbar2 from "./Navbar2";

import { CiLocationOn } from "react-icons/ci";
import { BsTelephoneFill } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import { BsFillClockFill } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";


const ContactUs =()=> {
  
  const[contactdata,Setcontactdata]=useState({
    Firstname:'',
    Lastname:'',
    Email:'',
    Mobile:'',
    Message:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    Setcontactdata({
      ...contactdata,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Subbmitted Succesfully')
    console.log("Contact form data" , contactdata)
    try {
      console.log('contactdata:', contactdata); // Log the form data
      // Send formData to backend
      await axios.post('http://localhost:5555/contact', contactdata);
  
      // Redirect on success
      // navigate('/');
    } catch (err) {
      console.error('Error:', err.response.data); // Log the error response details
  
      // Show an alert with the error message
      window.alert(`Error: ${err.response.data.error}`);

    }
  }
  
 
    return (
      <div >
        <Navbar2/>
        <div className="total">
        
        <h1 className="head">Contact Us</h1>
        
        <div className="contact-container">
         
            
          <form
            action="#"
            method="POST"
            className="contact-form1"
            
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="First Name">First Name: </label>
              <input
                type="text"
              
                name="Firstname"
                onChange={handleChange}
                placeholder="Enter Your First Name"
                required
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="Last Name">Last Name:</label>
              <input
                type="text"
             
                name="Lastname"
                onChange={handleChange}
                placeholder="Enter Your Last Name"
                required
             
               
              />
            </div>

            <div className="form-group">
              <label htmlFor="Your Email Id">Email ID:</label>
              <input
                type="text"
               
                name="Email"
                onChange={handleChange}
                placeholder="Enter Your Email Id"
                required
              
              />
            </div>

            <div className="form-group">
              <label htmlFor="number">Mobile:</label>
              <input
                type="number"
               name="Mobile"
                onChange={handleChange}
                placeholder="Enter Your Mobile Nubmer"
                required
              
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="Message"  onChange={handleChange} required />
            </div>
            <button className="cts-btn-success" type="submit">
              Submit
            </button>
          </form>
            <div className="c1">
              <div className="con1">
              <IoHomeSharp /><br/>
              <h4>Your Store</h4>
              <p>Matrical Technologies Beml road</p>
              <button ><CiLocationOn style={{marginTop:'-5px'}} />&nbsp;<a href="http://www.google.com">View on Google map</a></button>
             
              </div>
              <hr/>
              <div className="con1">
              <BsTelephoneFill />
              <h4>Telephone</h4>
              <p>+919036686725</p>
              
              <button><FaWhatsapp style={{marginTop:'-3px'}}/>&nbsp;<a href="http://wa.me/9036686725">What's App</a></button>
              </div>
              <hr/>
              <div className="con1">
              <BsFillClockFill /> 
              <h4>opening Timings</h4>
              <p>8:00 A.M to 9:00 P.M</p>
              </div>
             
            </div>

         
        </div>
       
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.770356786728!2d77.51560167379478!3d12.922475987388404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e21c103985b%3A0x7af7b0258b8258fa!2sMatrical%20Technologies!5e0!3m2!1sen!2sin!4v1682603452282!5m2!1sen!2sin"
            width="97%"
            height="429.5px"
            className="i1"
            style={{ border: "0",borderRadius:'8px',  marginLeft:'0px',boxShadow:'0 0 20px grey', margin:'1.2rem' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="mapMT"     
          />
      </div>
      </div>
    );
  }
export default ContactUs;