
  import React, { useContext, useState, useEffect } from "react";
  import "./Cart.css";
  import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { Link, useNavigate } from "react-router-dom";
  import { CartContext } from "./CreateContext";
  import Navbar2 from "./Navbar2";
  import axios from "axios";
  import { BASE_URL } from "../services/Helpers";


  const calculateSubtotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.sp * item.quantity, 0);
  };

  export const calculateTotal = (cartItems) => {
    const calculateDelivery = () => {
      const subtotal = calculateSubtotal(cartItems);
      return subtotal >= 500 ? 0 : 50;
    };

    return calculateSubtotal(cartItems) + calculateDelivery();
  };

  function Cart() {
    const {
      cartItems,
      removeFromCart,
      handleDecrement,
      handleIncrement,
      setCartItems,
      addToCart,
    } = useContext(CartContext);
    const [inputValue, setInputValue] = useState("");
    const [token] = useState(localStorage.getItem("token"));
    const [backendCartItems, setBackendCartItems] = useState([]);

    useEffect(() => {
      axios
        .get(`${ BASE_URL }/api/profile`, {
          headers: {
            "x-token": token,
          },
        })
        .then((res) => {
          const selectedItems = res.data.user.cart || [];
          setBackendCartItems(selectedItems);
        })
        .catch((err) => console.log(err));
    }, [token,backendCartItems]);
    

    const usderSubmit = (e) => {
      e.preventDefault();
      if (inputValue === "NEW100") {
        alert("coupon applied successfully");
      } else {
        alert("error");
      }
    };

    const isCartEmpty = cartItems.length === 0;
    const navigate = useNavigate();

    const handleNextClick = () => {
      if (isCartEmpty) {
        alert("Please add a product to the cart to continue.");
      } else {
        navigate("/IntegratedAddressPage", {
          state: { totalAmount: calculateTotal(cartItems) },
        });
      }
    };

    const handleRemoveProduct = (productId) => {
      removeFromCart(productId);
    };

    const calculateDelivery = () => {
      const subtotal = calculateSubtotal(cartItems);
      return subtotal >= 500 ? 0 : 50;
    };

    const calculateTotal1 = () => {
      return calculateSubtotal(cartItems) + calculateDelivery();
    };

    const calculateTotalAmount = () => {
      return (
        calculateSubtotal(cartItems) +
        calculateDelivery() -
        (inputValue === "NEW100" ? 100 : 0)
      );
    };
    console.log("Backend Cart Items:", backendCartItems);

    return (
      <div>
        <Navbar2 />
        <div className="App">
          <main className="main-container">
            <form className="product-form">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {backendCartItems.length === 0 ? (
                    <tr>
                      <td colSpan="4">No products in Cart!</td>
                    </tr>
                  ) : (
                    backendCartItems.map((item) => (
                      <tr key={item.productId}>
                        <td colSpan="1">
                          <div className="row">
                            <div className="product-info">
                              <div className="product-image-box">
                                {item.productImages &&
                                item.productImages.length > 0 ? (
                                  <div className="image-with-description">
                                    <img
                                      className="imagee-cart"
                                      src={`${ BASE_URL }/api/uploads/${item.productImages[0]}`}
                                      alt={`Product ${item.productId}`}
                                      width="100"
                                      height="100"
                                    />
                                  </div>
                                ) : (
                                  <p>No image available</p>
                                )}
                                <h6 className="name">{item.productName}</h6>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <center>
                            <b>₹ {item.sp}</b>
                          </center>
                        </td>
                        <td className="quantity-box">
                          <button
                            type="button"
                            className="bt"
                            onClick={() => handleDecrement(item)} // Pass the entire product object
                          >
                            -
                          </button>

                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            className="bt"
                            onClick={() => handleIncrement(item)} // Pass the entire product object
                          >
                            +
                          </button>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <b>₹{item.sp * item.quantity}</b>
                            <button
                              type="button"
                              onClick={() => handleRemoveProduct(item.productId)}
                              className="remove-icon"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <td colSpan="4">
                    <div className="custom-footer">
                      <Link to="/SareesCategories2">
                        <button type="submit" className="btn btn-primary">
                          Continue Shopping
                        </button>
                      </Link>
                      <button
                        className="cart-next-button"
                        disabled={isCartEmpty}
                        onClick={handleNextClick}
                      >
                        Next
                      </button>
                    </div>
                  </td>
                </tfoot>
              </table>
            </form>
            {/* Additional table for cart total */}
            <div className="cart-total-table">
              <form>
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan="2">Cart Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>₹{calculateSubtotal(cartItems)}</td>
                    </tr>
                    <tr>
                      <td>Delivery</td>
                      <td>₹{calculateDelivery()}</td>
                    </tr>
                    <tr>
                      <td>Total Amount</td>
                      <td>₹{calculateTotal1()}</td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          className="coupon-inputvik"
                          type="text"
                          name="inputValue"
                          value={inputValue}
                          placeholder="Coupon code"
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button className=" buttoncoupn" onClick={usderSubmit}>
                          Apply
                        </button>
                        {inputValue === "NEW100" && (
                          <p className="Couponalert">
                            Coupon NEW100 Applied and discount 100/-
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Final Bill</td>
                      <td>₹{calculateTotalAmount()}</td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }

  export default Cart;