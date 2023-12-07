// Auth2/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for token in localStorage when the app starts
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setUser({ token: storedToken });
    }
  }, []);

  const login = (userData) => {
    console.log('User set:', userData);

    // Save the token to localStorage
    localStorage.setItem('token', userData.token);

    setUser({ ...userData, token: userData.token });
  };

  useEffect(() => {
    console.log('User logged in:', user);
  }, [user]);

  const logout = () => {
    // Remove the token from localStorage on logout
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
