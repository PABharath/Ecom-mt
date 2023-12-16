// Profile.js - frontend
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import Navbar2 from '../Pages/Navbar2';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [token,] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const decodeToken = () => {
      const decodedToken = jwt_decode(user.token);
      setProfile(decodedToken);
    };

    if (user) {
      decodeToken();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar2/>
      <div>
      <h2>Welcome, {profile.username}!</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Contact: {profile.contact}</p>
      <p>Address: {profile.address}</p>

      {profile.cart && profile.cart.length > 0 && (
        <>
          <h3>Cart</h3>
          <ul>
            {profile.cart.map((product) => (
              <li key={product._id}>{product.productName}</li>
            ))}
          </ul>
        </>
      )}

      {profile.wishlist && profile.wishlist.length > 0 && (
        <>
          <h3>Wishlist</h3>
          <ul>
            {profile.wishlist.map((product) => (
              <li key={product._id}>{product.productName}</li>
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

      <button onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
};

export default Profile;
