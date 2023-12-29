import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import Navbar2 from "../Pages/Navbar2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";
import ProfileOrders from "../Pages/ProfileOrders";

const Profile = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState({});
  const [token] = useState(localStorage.getItem("token"));
  const [activeTab, setActiveTab] = useState("cart"); 
  const [email]=useState(localStorage.getItem('email'));
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5555/api/profile", {
        headers: {
          "x-token": token,
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
    navigate("/Login");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!token) {
    navigate("/Login");
  }
  const handleDeleteAddress = async ( addressId) => {
    try {
      // Send a DELETE request to the server with both user ID and address ID
      await axios.delete(
        `http://localhost:5555/api/address/${email}/${addressId}`,
       
      );

      // Update the state to reflect the deleted address
      

      // Display a success toast
      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address:", error);
      // Display an error toast with the specific error message
      toast.error(`Error deleting address: ${error.message}`);
    }
  };

  return (
    <div>
      
      <Navbar2 />
      
      <div>
        {Object.keys(profile).length > 0 ? (
          <>
            <div className="first">
              <div className="first1">
              <h2 className="welcome">Welcome, {profile?.username}!</h2>
              <p className="user">Username: {profile?.username}</p>
              <p className="email">Email: {profile?.email}</p>
              <p className="contanct">Contact: {profile?.contact}</p>
              <button className="sign" onClick={handleLogout}>
                SIGN OUT
              </button>
              <br/><br/>
              </div>
            </div>
            <div>
              {profile.cart && profile.cart.length > 0 && (
                <>
                  <div className="second">
                    <div className="third">
                    <div className="cont1">
                      <div className="container-cart">
                        
                        <button
                          className="carts"
                          onClick={() => handleTabClick("cart")}
                        >
                          carts
                        </button>
                        
                        <hr className="hr"></hr>
                        <button
                          className="wish"
                          onClick={() => handleTabClick("wishlist")}
                        >
                          wishlist
                        </button>
                        <hr className="hr"></hr>
                        <button
                          className="wish"
                          onClick={() => handleTabClick("orders")}
                        >
                          Orders
                        </button>
                        <hr className="hr"></hr>
                        <button
                          className="wish"
                          onClick={() => handleTabClick("addresses")}
                        >
                          Addresses
                        </button>
                        </div>
                      </div>
                      {activeTab === "cart" && (
                        <div className="cart-container">
                          <h3 className="cart">Cart</h3><br/>
                          <ul className="product-profile mains-list">
                            {profile.cart.map((product) => (
                              <li className="liiii" key={product._id}>
                                <div className="product-item">
                                  <img
                                    className="product-imgvik-profile1"
                                    src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                                    alt={product.productName}
                                  />
                                  <div className="product-details1">
                                    
                                     <p className="item1"> {product.productName}</p>
                                  
                                  
                                      <p className="item1">Price:{product.sp}</p>
                                 <p className="item1">Quantity:{product.quantity}</p>
                                   
                               
                                  </div>
                                
                                </div>
                                
                                <hr className="hr1"/>
                              </li>
                              
                            ))}
                          </ul>
                          
                        </div>
                        
                      )}
                      {activeTab === "wishlist" && (
                        <div className="wishlist-container">
                          <h3 className="cart">Wishlist</h3><br/>
                          <ul className="product-profile wishlist-list">
                            {profile.wishlist.map((product) => (
                              <li className="liiii" key={product._id}>
                                <div className="product-item1">
                                  <img
                                    className="product-imgvik-profile2"
                                    src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                                    alt={product.productName}
                                  />
                                  <br></br>
                                  <div className="product-details2">
                                    <p className="item1">{product.productName}</p> 
                                    <p className="item1">
                                      Price: {product.sp}
                                    </p>
                                  </div>
                                  
                                </div>
                                <br/>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                     {activeTab === "orders" && (
  <ProfileOrders />
)}

                      {activeTab === "addresses" &&
                        profile.address &&
                        profile.address.length > 0 && (
                          <div className="addresses-container">
                            <h3 className="addresses">Addresses</h3>
                            <div className="address-list">
                              {profile.address.map((address) => (
                                <div className="liiii" key={address._id["$oid"]}>
                                  <div className="address-details">
                                  
                                    <p>
                                      <strong>Full name:</strong>{" "}
                                      {address.fullName}
                                    </p>
                                    <p>
                                      <strong>MobileNumber:</strong>{" "}
                                      {address.mobileNumber}
                                    </p>
                                    <p>
                                      <strong>addressLine:</strong>{" "}
                                      {address.addressLine}
                                    </p>
                                    <p>
                                      <strong>area:</strong> {address.area}
                                    </p>
                                    <p>
                                      <strong>town:</strong> {address.town}
                                    </p>
                                    <p>
                                      <strong>state:</strong> {address.state}
                                    </p>
                                    <p>
                                      <strong>country</strong> {address.country}
                                    </p>
                                    <p>
                                      <strong>pincode</strong> {address.pincode}
                                    </p>
                                    <div>
                                      <button
                                        className="wishes"
                                        onClick={() => {
                                          console.log(
                                            "Address ID:",
                                            address._id["$oid"]
                                          );
                                          handleDeleteAddress(
                                            address._id
                                          );
                                        }}
                                      >
                                        delete
                                      </button>
                                     
                                    </div>
                                  </div>
                                  </div>
                              
                              ))}
                            </div>
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
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Profile;
