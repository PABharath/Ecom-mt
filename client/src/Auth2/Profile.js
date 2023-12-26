import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import Navbar2 from '../Pages/Navbar2';
import './Profile.css';

const Profile = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState({});
  const [token] = useState(localStorage.getItem('token'));
  const [activeTab, setActiveTab] = useState('cart'); // Default to 'cart'
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
    logout();
    navigate('/Login');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
            <div className='first'>
              <h2 className='welcome'>Welcome, {profile?.username}!</h2>
              <p className='user'>Username: {profile?.username}</p>
              <p className='email'>Email: {profile?.email}</p>
              <p className='contanct'>Contact: {profile?.contact}</p>
              <button className='sign' onClick={handleLogout}>
                SIGN OUT
              </button>
            </div>
            <div>
              {profile.cart && profile.cart.length > 0 && (
                <>
                  <div className='second'>
                    <div className='third'>
                      <div className='container-cart'>
                        <button className='carts' onClick={() => handleTabClick('cart')}>
                          carts
                        </button>
                        <hr className='hr'></hr>
                        <button className='wish' onClick={() => handleTabClick('wishlist')}>
                          wishlist
                        </button>
                        {/* ... (other buttons) */}
                      </div>
                      {activeTab === 'cart' && (
                        <div className='cart-container'>
                          <h3 className='cart'>Cart</h3>
                          <ul className='product-profile mains-list'>
                            {profile.cart.map((product) => (
                              <li className="liiii" key={product._id}>
                                <div className='product-item'>
                                  <img
                                    className="product-imgvik-profile"
                                    src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                                    alt={product.productName}
                                  />
                                  <div className='product-details'>
                                    <p className='name'>{product.productName}</p>
                                    <p><strong>Price:</strong> {product.sp}</p>
                                    <p><strong>Quantity:</strong> {product.quantity}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {activeTab === 'wishlist' && (
                        <div className='wishlist-container'>
                          <h3 className='cart'>Wishlist</h3>
                          <ul className='product-profile wishlist-list'>
                            {profile.wishlist.map((product) => (
                              <li className="liiii" key={product._id}>
                                <div className='product-item'>
                                  <img
                                    className="product-imgvik-profile"
                                    src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                                    alt={product.productName}
                                  />
                                  <br></br>
                                  <div className='product-details'>
                                    <p>{product.productName}</p> <br></br>
                                    <p><strong>Price:</strong> {product.sp}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
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
