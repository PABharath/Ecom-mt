import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import Navbar2 from "../Pages/Navbar2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";

const Profile = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState({});
  const [token] = useState(localStorage.getItem("token"));
  const [activeTab, setActiveTab] = useState("cart"); // Default to 'cart'
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
              <h2 className="welcome">Welcome, {profile?.username}!</h2>
              <p className="user">Username: {profile?.username}</p>
              <p className="email">Email: {profile?.email}</p>
              <p className="contanct">Contact: {profile?.contact}</p>
              <button className="sign" onClick={handleLogout}>
                SIGN OUT
              </button>
            </div>
            <div>
              {profile.cart && profile.cart.length > 0 && (
                <>
                  <div className="second">
                    <div className="third">
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
                      {activeTab === "cart" && (
                        <div className="cart-container">
                          <h3 className="cart">Cart</h3>
                          <ul className="product-profile mains-list">
                            {profile.cart.map((product) => (
                              <li className="liiii" key={product._id}>
                                <div className="product-item">
                                  <img
                                    className="product-imgvik-profile"
                                    src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                                    alt={product.productName}
                                  />
                                  <div className="product-details">
                                    <p className="name">
                                      {product.productName}
                                    </p>
                                    <p>
                                      <strong>Price:</strong> {product.sp}
                                    </p>
                                    <p>
                                      <strong>Quantity:</strong>{" "}
                                      {product.quantity}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {activeTab === "wishlist" && (
                        <div className="wishlist-container">
                          <h3 className="cart">Wishlist</h3>
                          <ul className="product-profile wishlist-list">
                            {profile.wishlist.map((product) => (
                              <li className="liiii" key={product._id}>
                                <div className="product-item">
                                  <img
                                    className="product-imgvik-profile"
                                    src={`http://127.0.0.1:5555/api/uploads/${product.productImages[0]}`}
                                    alt={product.productName}
                                  />
                                  <br></br>
                                  <div className="product-details">
                                    <p>{product.productName}</p> <br></br>
                                    <p>
                                      <strong>Price:</strong> {product.sp}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {activeTab === "orders" &&
                        profile.orders &&
                        profile.orders.length > 0 && (
                          <div className="orders-container">
                            <h3 className="orders">Orders</h3>
                            <ul className="order-list">
                              {profile.orders.map((order) => (
                                <li key={order.orderId}>
                                  <div className="order-details">
                                    <p>
                                      <strong>Order ID:</strong> {order.orderId}
                                    </p>
                                    <p>
                                      <strong>Total Amount:</strong>{" "}
                                      {order.totalAmount}
                                    </p>
                                    <p>
                                      <strong>Status:</strong> {order.status}
                                    </p>
                                    {/* Add more order details as needed */}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {activeTab === "addresses" &&
                        profile.address &&
                        profile.address.length > 0 && (
                          <div className="addresses-container">
                            <h3 className="addresses">Addresses</h3>
                            <ul className="address-list">
                              {profile.address.map((address) => (
                                <li className="liiii" key={address._id["$oid"]}>
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
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Profile;
