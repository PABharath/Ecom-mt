import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { MdOutlineRemoveRedEye  } from "react-icons/md";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import useAuth from './useAuth'; // Import the useAuth hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from useAuth
  

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5555/auth/login', { email, password });
      if (response.status === 200) {
        // Set the token when login is successful
        const token = response.data.token;
        localStorage.setItem('token', token);
  
        // Set the user data using the login function
        login({ token, email });
  
        // Display success toast on successful login
        toast.success('Login successful');
  
        // Clear the state
        setEmail('');
        setPassword('');
        setMessage('');
  
        // Navigate to Home page after successful login
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        // Display error toast for invalid credentials
        toast.error('Login failed. Invalid credentials');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error); // Display the specific error message from the server
      } else {
        console.error('Error occurred during login:', error);
        setMessage('An error occurred'); // Display a more generic message for any other errors
        console.log(error); // Log the error object to the console for debugging
      }
    }
  };
    


  return (
    <div className='overflow'>
    <div className="loginbgcontainer1">
      <section className="logincontainer1 loginforms1">
        <div className='logincontainer2'>
        <div className="loginform1 register">
          <div className="loginform-content1">
            <header className="loginHeadername1">Login</header>
            <form onSubmit={handleSubmit}>
              {/* Input fields for email and password */}
              <div className="loginfield1 logininput-field1">
                <input
                  type="email"
                  name="email" // Add name attribute for form submission
                  placeholder="Email"
                  className="input1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="loginfield1 logininput-field1">
                <input
                  type="password"
                  id="password-input"
                  name="password" // Add name attribute for form submission
                  placeholder="Password"
                  className="loginpassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />            
                <span className='login-icon21' onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>
                                      
              </div>

             
               <div className="loginform-link">
                <Link to="/forgot" className="loginforgot-pass">
                  Forgot password?
                </Link>
              </div>

              {/* Display error message */}
              {message && <p className="login-error-message">{message}</p>}

              {/* Login button */}
              <div className="loginfield1 loginbutton-field1">
                <button type="submit">Login</button>
              </div>
            </form>
            
            {/* Link to register page */}

            <div className='login-or'>
              <div className='login-hr1'/><div className='or'>or</div><div className='login-hr2'/>
            </div>
          </div>
          
          {/* Google login */}
          <div className="log-google google-login-containers">
            <GoogleOAuthProvider clientId="476717558763-pbbvpjdugi7ium3eprbclkqn8f61hllf.apps.googleusercontent.com">
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

                 <div className="loginform-link1">
              <span>
                  Don't have an account?{' '}
                <strong>
                  <Link className="loginspan1" to="/register">
                    Register
                  </Link>
                </strong>
              </span>
            </div>
        </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Login;