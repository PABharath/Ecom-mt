import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import useAuth from "./useAuth"; // Import the useAuth hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar2 from "../Pages/Navbar2";

const Login = () => {
  const [data,setData] = useState({
    email:'',
    password:'',
})
  const [token,setToken] = useState('') 
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = e =>{
    setData({...data,[e.target.name]:e.target.value})
}


  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from useAuth

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    const passwordInput = document.getElementById("password-input");

    if (passwordInput) {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    try {
      const response = await axios.post("http://127.0.0.1:5555/api/login",data);
      const email = data.email;
    
      if (response.status === 200) {  
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('email' , email)

        // Display success message using toast.success
        toast.success('Login successful', { position: 'top-center', autoClose: 3000 });
  
        // Set the user data using the login function
        // login({ token, email }); 
  
        // Navigate to Home page after successful login
        
      } else {
        // Display error message for non-200 response status using toast.error
        toast.error('Invalid credentials', { position: 'top-center', autoClose: 3000 });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Display specific error message from the server using toast.error
        toast.error(error.response.data.error, { position: 'top-center', autoClose: 3000 });
      } else {
        console.error("Error occurred during login:", error);
  
        // Display a more generic error message for other errors using toast.error
        toast.error('An error occurred', { position: 'top-center', autoClose: 3000 });
  
        console.log(error); // Log the error object to the console for debugging
      }
    }
  };
  
  if(token){
    setTimeout(() => {
      navigate('/');
    }, 2000);
  
  
   }

  return (
   <div>
    <Navbar2/>
     <div className="overflow">
      <div className="loginbgcontainer1">
        <section className="logincontainer1 loginforms1">
          <div className="logincontainer2">
            <div className="loginform1 register">
              <div className="loginform-content1">
                <header className="loginHeadername1" style={{textAlign:'center'}}>Login</header>
                <form onSubmit={handleSubmit}>
                  {/* Input fields for email and password */}
                  <div className="loginfield1 logininput-field1">
                    <input
                      type="email"   
                      name="email" // Add name attribute for form submission
                      placeholder="Email"
                      className="input1"
                      value={data.email}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="loginfield1 logininput-field1">
                    <input
                      type="password"
                      id="password-input"
                      name="password" // Add name attribute for form submission
                      placeholder="Password"
                      className="loginpassword1"
                      value={data.password}
                      onChange={changeHandler}
                    />
                    <span
                      className="login-icon21"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} style={{color:'black'}} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} style={{color:'black'}} />
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

                <div className="login-or">
                  <div className="login-hr1" />
                  <div className="or">or</div>
                  <div className="login-hr2" />
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
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>

              <div className="loginform-link1">
                <span>
                  Don't have an account?{" "}
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
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
   </div>
  );
};

export default Login;
