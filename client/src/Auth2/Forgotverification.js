import React, { useState } from "react";
import "./Forgotverification.css";
// import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Navbar2 from "../Pages/Navbar2";


function Forgotverification() {
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [setpassword,SetConformpassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    const passwordInput = document.getElementById('password-input');
  
    if (passwordInput) {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
  }
}

  };
  const togglePasswordVisibility2 = () => {
    SetConformpassword((prev) => !prev);
    const passwordInput = document.getElementById('password-input2');
  
    if (passwordInput) {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
  }
}
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend to verify the OTP and update the password
      const response = await axios.post('http://localhost:5555/api/verify-otp-and-update-password', {
        verificationCode,
        newPassword,
        confirmNewPassword,
      });
      
      if (response.status === 200) {
        setMessage('Password reset successful');
        // Redirect to a new page or perform any action upon successful password reset
      } else {
        setMessage('Password reset failed');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred during password reset');
    }
  };

  return (
   
   <div>
     <Navbar2/>
    <div className="fgv-bgcontainer">
      <div className="fgv-bg1">
      <div className="fgv-cardcontainer">
        {/* <div className="fgvarrow">
          <AiOutlineArrowLeft></AiOutlineArrowLeft>
        </div> */}
        <h1 className="fgvheadername1" style={{fontFamily:'verdana'}}>Reset Password</h1>
        
        <p className="fgvpara" style={{textAlign:'center'}}>
          Create new password as you can login to your account
        </p>
        <form onSubmit={handleSubmit}>
          {/* <div className="fgv-field fgv-input-field">
            <label>New Password</label> 
            
            <input
           
              type="text"
              placeholder="new password"
              className="input1"
              value={verificationCode}
              
              onChange={(e) => setVerificationCode(e.target.value)}
               />
               <span className="icon1"
               ><FaRegEyeSlash /></span>
               
          </div> */}
          <div className="fgv-field fgv-input-field">
            {/* <label>Confirm Password</label> */}
            <input
              type="password"
              id="password-input"
              placeholder="new password"
              className="input1"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />    <span className='icon1' onClick={togglePasswordVisibility}>
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
    
          </div>
          <br/>
           <div className="fgv-field fgv-input-field">
            {/* <label>Confirm New Password</label> */}
            <input
              type="password"
              id="password-input2"
              placeholder="Confirm password"
              className="input1"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            /><span className='icon1' onClick={togglePasswordVisibility2}>
            {setpassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
          </div> 
          <br/>
          <div className="fgv-field fgv-button-field">
            <button className="button" type="submit">Submit</button>
          </div>
        </form>
        {message && <p className="fgv-message">{message}</p>}
      </div>
    </div>
    </div>
   </div>
  );
}

export default Forgotverification;
