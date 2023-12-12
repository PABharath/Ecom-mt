// Profile.js - frontend
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import useAuth from './useAuth';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    console.log("Profile component rendering...");
    console.log("User from useAuth:", user);

    const decodeToken = () => {
      const decodedToken = jwt_decode(user.token);
      setProfile(decodedToken); // Assuming user details are stored in the token
    };

    if (user) {
      console.log('decoding token...');
      decodeToken();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Navigate to the login page after logout
  }; 

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Welcome, {profile.username}!</h2>
      <p>Username: {profile.username}</p>
      {/* Display other user details */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
