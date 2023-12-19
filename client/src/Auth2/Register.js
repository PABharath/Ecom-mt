import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar2 from '../Pages/Navbar2';

const Register = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [setpassword,SetConformpassword] = useState(false);




  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    const passwordInput = document.getElementById('password-input1');
  
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


  const isNameValid = name.trim() !== '';
  const isPhoneNumberValid = /^[0-9]{10}$/.test(phoneNumber);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordValidation = (pass) => {
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);
    const hasDigit = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*]/.test(pass);

    const requirements = [];
    if (!hasUppercase) requirements.push('an uppercase letter');
    if (!hasLowercase) requirements.push('a lowercase letter');
    if (!hasDigit) requirements.push('a digit');
    if (!hasSpecialChar) requirements.push('a special character');

    return {
      isValid: hasUppercase && hasLowercase && hasDigit && hasSpecialChar,
      requirements,
    };
  };

  const isPasswordValid = passwordValidation(password);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      toast.error('Invalid email address', { position: 'top-center', autoClose: 3000 });
    } else if (!isNameValid) {
      toast.error('Please enter your name', { position: 'top-center', autoClose: 3000 });
    } else if (!isPhoneNumberValid) {
      toast.error('Invalid phone number', { position: 'top-center', autoClose: 3000 });
    } else if (!isPasswordValid.isValid) {
      toast.error(`Password must include ${isPasswordValid.requirements.join(', ')}`, { position: 'top-center', autoClose: 3000 });
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match', { position: 'top-center', autoClose: 3000 });
    } else {
      try {
        const response = await axios.post('http://localhost:5555/api/register', {
          username: name,
          email: email,
          contact: phoneNumber,
          password: password,
        });
        if (response.status === 201) {
          // Display success message using toast.success
          toast.success('Registration successful', { position: 'top-center', autoClose: 3000 });

          setTimeout(() => {
            setErrorMessage('');
          }, 3000);

          // Redirect to login page
          navigate('/login');
        } else {
          // Display unknown error message using toast.error
          toast.error('Unknown error occurred', { position: 'top-center', autoClose: 3000 });
        }
      } catch (error) {
        // Display user already exists message using toast.error
        toast.error('User already exists', { position: 'top-center', autoClose: 3000 });
      }
    }
  };


  return (
  <div>
    <Navbar2/>
    <div className="bgRegistercontainermain">
     <div className='bgRegistercontainer1' >
     <form className=" forms1" onSubmit={handleSubmit}>
        
          <div className="form-content1">
            <header className="Headername1">Register Now</header>
            <div className="field1 input-field1">
              <input
                type="text"
                placeholder="Name"
                className={`input1 ${!isNameValid ? 'invalid' : ''}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field1 input-field1">
              <input
                type="text"
                placeholder="Phone Number"
                className={`input1 ${!isPhoneNumberValid ? 'invalid' : ''}`}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="field1 input-field1">
              <input
                type="email"
                placeholder="Email"
                className={`input1 ${!isEmailValid ? 'invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>



            <div className="field1 input-field1">
            <span className='icon2v' onClick={togglePasswordVisibility}>
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
    



              <input
                type="password"
                id='password-input1'
                placeholder="Password"
                className={`password1 ${!isPasswordValid.isValid ? 'invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>



            <div className="field1 input-field1">
           
            <span className='icon2v' onClick={togglePasswordVisibility2}>
            {setpassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
    
    


              <input
                type="password"
                id='password-input2'
                placeholder="Confirm Password"
                className="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              






              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div className="field1 button-field1">
              <button type="submit-register">Register</button>
            </div>
           
          </div>
          
           
            <p className="para1">Or</p>
           
          
          <div className="googlecontainer-register" >
        <GoogleOAuthProvider  clientId="476717558763-pbbvpjdugi7ium3eprbclkqn8f61hllf.apps.googleusercontent.com">
          <GoogleLogin 
            onSuccess={(credentialResponse) => {
              const details = jwt_decode(credentialResponse.credential);
              console.log(details);
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      </div>
      <div className="form-link1">
              <span>
                
                  Already have an account?{' '}
                  <Link className="span1" to="/login">
                    Login
                  </Link>
               
              </span>
            </div>
       
      </form>
     </div>
     <ToastContainer position="top-center" autoClose={3000} />

    </div>
  </div>
  );
};

export default Register;