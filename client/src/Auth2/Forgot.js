import React, { useState } from "react";
import "./Forgot.css";
import { Link } from "react-router-dom"; 
import Navbar2 from "../Pages/Navbar2";
// import { AiOutlineArrowLeft } from "react-icons/ai";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to your backend to initiate the OTP sending
      const response = await fetch("http://localhost:5555/auth/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      console.log('Response:', response);

      if (response.ok) {
        setShowOtpField(true);
      } else {
        // Handle error response
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to your backend to verify the entered OTP
      const response = await fetch("http://localhost:5555/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      console.log('Response:', response);

      if (response.ok) {
        // TODO: Navigate the user to the password reset page
        console.log("OTP verified successfully. Redirect to password reset page.");
      } else {
        // Handle error response
        console.error("Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
   <div>
    <Navbar2/>
    <div className="fg-bgcontainer">
      <div className="backgr-45">
      <div className="fg-cardcontainer">
        {/* <div className="fgarrow">
          <AiOutlineArrowLeft></AiOutlineArrowLeft>
        </div> */}
        <h1 className="fgheadername">Forgotten Password</h1>
        <p className="fgpara">
          we will send you an email to reset your password
        </p>
        <div className="fieldcontainer">
          {!showOtpField ? (
            <form onSubmit={handleEmailSubmit}>
              <div className="fg-field fg-input-field">
                {/* <label></label> */}
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="fg-field fg-button-field">
                <button type="submit" className="button">
                  Submit
                </button>

                <div className="or-line">
                <span>--OR--</span>
              </div>
              <div className="backtologin">
                <Link to="/login">Or back to login</Link>
                
              </div>
              
              </div>
              
            </form>
            
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className="fg-field fg-input-field">
                <label>Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="fg-field fg-button-field">
                <button type="submit" className="button">
                  Verify OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    </div>
   </div>
  );
};

export default Forgot;