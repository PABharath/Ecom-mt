// Profile.js - frontend
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import Navbar2 from '../Pages/Navbar2';
import axios from 'axios';
import './Profile.css';
// import vani from './Assests/vani.jpg'

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({});
  const [token] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  };

  if (!token) {
    navigate('/Login');
  }

  return (
    <div>
      <Navbar2 />
      <div>
        {Object.keys(profile).length > 0 ? (
          <>
          <div className='mine'> 
            <div className='main'>
              
              <h2 className='welcome'>Welcome, {profile?.username}!</h2>
              <p className='user'>Username: {profile?.username}</p>
              <p className='users'>Email: {profile?.email}</p>
              <p className='users'>Contact: {profile?.contact}</p>
            </div>
            </div>
            <div className='fix'>
              {profile.cart && profile.cart.length > 0 && (
                <>
                  <div className='mains'>
                    <h3 className='welcomes'>Cart</h3>
                    <ul className='product-profile mains-list'>
                      {profile.cart.map((product) => (
                        <li className='li654' key={product._id}>
                          <div className='product-item'>
                            <img
                              className="product-imgvik-profile"
                              src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                              alt={product.productName}
                            />
                            <div className='product-details'>
                              <p className='welcomess'>{product.productName}</p>
                              <p className='sss'><strong>Price:</strong> {product.sp}</p>
                              <p className='prices'><strong>Quantity:</strong> {product.quantity}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {profile.wishlist && profile.wishlist.length > 0 && (
                <>
                  <div className='mainsss'>
                    <h3 className='welcomes'>Wishlist</h3>
                    <ul className='product-profile wishlist-list'>
                      {profile.wishlist.map((product) => (
                        <li className='li654' key={product._id}>
                          <div className='product-item'>
                            <img
                              className="product-imgvik-profile"
                              src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                              alt={product.productName}
                            />
                            <br></br>
                            <div className='product-details'>
                              <p className='welcomess'>{product.productName}</p> <br></br>
                              <p className='price'><strong>Price:</strong> {product.sp}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
