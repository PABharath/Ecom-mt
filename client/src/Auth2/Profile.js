// Profile.js - frontend
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import Navbar2 from '../Pages/Navbar2';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({});
  const [token,] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // useEffect(() => {
  //   const decodeToken = () => {
  //     const decodedToken = jwt_decode(user.token);
  //     setProfile(decodedToken);
  //   };

  //   if (user) {
  //     decodeToken();
  //   }
  // }, [user]);

  // const handleLogout = () => {
  //   logout();
  //   navigate('/Login');
  // };

  const handleLogout = () => {
    // Clear the token
    
    localStorage.removeItem('token')
    
    // Redirect to the login page
    navigate('/Login');
  }
  



  useEffect(() => {
    axios
      .get('http://localhost:5555/api/profile', {
        headers: {
          'x-token': token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfile(res.data.user);
        
      })
      .catch((err) => console.log(err));
  }, [token]);
  


 
if(!token){
  navigate('/Login');  
}

return (
  <div>
    <Navbar2 />
    <div>
      {Object.keys(profile).length > 0 ? ( // Check if profile has properties
        <>
      
          <h2>Welcome,{profile?.username}!</h2>
          <p>Username:{profile?.username}</p>

          <p>Email:{profile?.email}</p>
          <p>Contact:{profile?.contact}</p>
          

          {profile.cart && profile.cart.length > 0 && (
            <>
              <h3>Cart</h3>
              <ul className='product-profile'>
              
        
      
                {profile.cart.map((product) => (
                   <li key={product._id}>
                <img
                      className="product-imgvik-profile"
                      src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                      alt={product.productName}
                    />
                   <div>  
                  <p>{product.productName} </p>    
                   
                  <p><strong>Price :</strong>{product.sp} </p> 
                   <p><strong>Quantity :</strong>{product.quantity}</p> 
                   </div>     
                 </li>
                  
                ))}
              </ul>
            </>
          )}

          {profile.wishlist && profile.wishlist.length > 0 && (
            <>
              <h3>Wishlist</h3>
              <ul className='product-profile'>
              {profile.wishlist.map((product) => (
                   <li key={product._id}>
                <img
                      className="product-imgvik-profile"
                      src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                      alt={product.productName}
                    />
                   <div>  
                  <p>{product.productName} </p>    
                   
                  <p><strong>Price :</strong>{product.sp} </p> 
                   
                   </div>     
                 </li>
                  
                ))}
              </ul>
            </>
          )}

          {profile.reviews && profile.reviews.length > 0 && (
            <>
              <h3>Reviews</h3>
              <ul>
                {profile.reviews.map((review) => (
                  <li key={review._id}>{review.comment}</li>
                ))}
              </ul>
            </>
          )}

          {/* <button onClick={handleLogout}>Logout</button> */}
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  </div>
);

};

export default Profile;
